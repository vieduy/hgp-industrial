"""Tiny LLM assistant for the HGP Industrial site.

A deliberately minimal chatbot: no sessions, no storage, no retrieval. The
frontend sends the full conversation, we prepend a persona system prompt built
from :mod:`app.content` (so the assistant always reflects the live site copy),
forward everything to the Google Gemini API, and return the reply text.

Configuration is read from the environment so the API key never has to live in
source control. Sensible defaults match the project's Gemini key, but in
production set ``LLM_API_KEY`` (and optionally ``LLM_BASE_URL`` / ``LLM_MODEL``).
"""

from __future__ import annotations

import json
import os
import urllib.error
import urllib.request
from typing import Iterator

from . import content

# ---------------------------------------------------------------------------
# Gemini configuration (override via environment)
# ---------------------------------------------------------------------------

# The v1beta surface — v1 does not accept ``systemInstruction``.
LLM_BASE_URL = os.environ.get(
    "LLM_BASE_URL", "https://generativelanguage.googleapis.com/v1beta"
)
LLM_MODEL = os.environ.get("LLM_MODEL", "gemma-4-31b-it")
# No default: a key committed to source control gets scraped and auto-revoked
# (that is exactly how the previous one died). Supply it via .env / the
# deployment environment; a missing key fails loudly on the first chat request.
LLM_API_KEY = os.environ.get("LLM_API_KEY", "")
# How long to wait on the upstream model before giving up (seconds).
LLM_TIMEOUT = float(os.environ.get("LLM_TIMEOUT", "60"))
# "minimal" disables the chain-of-thought entirely — faster, cheaper, and fine
# for site Q&A.
#
# Do NOT raise this on a Gemma model without re-testing: with thinking enabled,
# Gemma streams its reasoning back as ordinary text parts that are *not* tagged
# ``thought: true``, so `_texts()` cannot filter them and the raw chain-of-thought
# ends up rendered in the chat window. At "minimal" the thought part is correctly
# tagged (and empty), so the filter holds.
LLM_THINKING_LEVEL = os.environ.get("LLM_THINKING_LEVEL", "minimal")


# ---------------------------------------------------------------------------
# Persona / system prompt
# ---------------------------------------------------------------------------


def _both(value: dict | str) -> str:
    """Render a bilingual ``{vi, en}`` value as ``VI / EN`` for the prompt."""
    if isinstance(value, dict):
        vi, en = value.get("vi", ""), value.get("en", "")
        if vi and en and vi != en:
            return f"{vi} / {en}"
        return en or vi
    return str(value)


def _bullets(items: list) -> str:
    return "\n".join(f"  - {_both(i)}" for i in items)


def build_system_prompt() -> str:
    """Build the assistant persona from the live site content.

    Pulling from :mod:`app.content` means editing the website copy also updates
    what the assistant knows — there is no second source of truth to maintain.
    """
    c = content.COMPANY
    a = content.ABOUT
    contact = c["contact"]

    catalogue_lines = []
    for cat in content.CATALOGUE:
        title = _both(cat["title"])
        tagline = _both(cat.get("tagline", ""))
        standard = cat.get("standard", "")
        brands = ", ".join(cat.get("brands", [])) if cat.get("brands") else ""
        line = f"  - {title}"
        if tagline:
            line += f": {tagline}"
        extra = []
        if standard:
            extra.append(f"standard {standard}")
        if brands:
            extra.append(f"brands: {brands}")
        if cat.get("fire_ratings"):
            extra.append("fire ratings: " + ", ".join(cat["fire_ratings"]))
        if extra:
            line += f" ({'; '.join(extra)})"
        catalogue_lines.append(line)

    partners = ", ".join(p["name"] for p in content.PARTNERS)
    projects = ", ".join(
        f"{p['name']} ({_both(p['location'])})" for p in content.PROJECTS
    )

    return f"""You are the virtual assistant for {c['name']} \
({c['name_vi']}), a Vietnamese company. Tagline: "{c['tagline']}".

Your job is to help website visitors with questions about the company, its \
products, services, and how to get in touch. Be concise, friendly, and \
professional.

IMPORTANT RULES:
- Reply in the SAME language the user writes in (Vietnamese or English). \
Default to Vietnamese if unsure.
- Only answer using the company information below. If you don't know \
something, say so and point the user to the hotline or email. Do not invent \
prices, specifications, or facts.
- Keep answers short and clear. Use bullet points for lists. For contact or \
quotation requests, share the hotline and email.

=== COMPANY ===
Name: {c['name']} ({c['name_vi']})
About: {_both(c['intro'])}
Philosophy: {_both(c['philosophy'])}
Focus areas:
{_bullets(c['focus'])}
Serves:
{_bullets(c['audience'])}

=== ABOUT ===
Vision: {_both(a['vision'])}
Mission:
{_bullets(a['mission'])}
Core values: {', '.join(v['key'] for v in a['core_values'])}
Commitment:
{_bullets(a['commitment'])}

=== PRODUCTS & SERVICES (CATALOGUE) ===
{chr(10).join(catalogue_lines)}

=== PARTNER BRANDS ===
{partners}

=== FEATURED PROJECTS ===
{projects}

=== CONTACT ===
Hotline: {contact['hotline']}
Email: {contact['email']}
Website: {contact['website']}
Address: {_both(contact['address'])}
Tax code: {contact['tax_code']}
Zalo: {contact['zalo']}
"""


# Built once at import time — the content is static for the life of the process.
SYSTEM_PROMPT = build_system_prompt()


# ---------------------------------------------------------------------------
# Chat
# ---------------------------------------------------------------------------


class AssistantError(RuntimeError):
    """Raised when the upstream model call fails."""


def _to_contents(messages: list[dict]) -> list[dict]:
    """Convert the frontend's OpenAI-style history to Gemini ``contents``.

    Gemini names the assistant turn "model" and nests text in ``parts``.
    """
    return [
        {
            "role": "model" if m["role"] == "assistant" else "user",
            "parts": [{"text": m["content"]}],
        }
        for m in messages
    ]


def _texts(candidate: dict) -> Iterator[str]:
    """Yield the visible text parts of a candidate, skipping thought parts."""
    for part in candidate.get("content", {}).get("parts", []):
        if part.get("thought"):
            continue
        text = part.get("text")
        if text:
            yield text


def _open(messages: list[dict], stream: bool):
    """Build and send the Gemini request, returning the open response.

    Raises :class:`AssistantError` on any connection / HTTP failure so callers
    can surface it before they start streaming a 200 response body.
    """
    if not LLM_API_KEY:
        raise AssistantError("LLM_API_KEY is not set — the assistant is unconfigured.")
    method = "streamGenerateContent?alt=sse&key=" if stream else "generateContent?key="
    url = f"{LLM_BASE_URL}/models/{LLM_MODEL}:{method}{LLM_API_KEY}"
    payload = {
        "systemInstruction": {"parts": [{"text": SYSTEM_PROMPT}]},
        "contents": _to_contents(messages),
        "generationConfig": {
            "thinkingConfig": {"thinkingLevel": LLM_THINKING_LEVEL},
        },
    }
    request = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        return urllib.request.urlopen(request, timeout=LLM_TIMEOUT)
    except urllib.error.HTTPError as exc:  # 4xx / 5xx from Gemini
        detail = exc.read().decode("utf-8", "replace")[:500]
        raise AssistantError(f"Gemini API error {exc.code}: {detail}") from exc
    except (urllib.error.URLError, TimeoutError) as exc:  # network / timeout
        raise AssistantError(f"Could not reach Gemini API: {exc}") from exc


def chat(messages: list[dict]) -> str:
    """Send the conversation to Gemini and return the full reply text.

    ``messages`` is the frontend conversation history as a list of
    ``{"role": "user"|"assistant", "content": str}`` dicts. The persona system
    prompt is sent as ``systemInstruction`` so the client never has to know it.
    """
    with _open(messages, stream=False) as response:
        data = json.loads(response.read().decode("utf-8"))
    try:
        reply = "".join(_texts(data["candidates"][0]))
    except (KeyError, IndexError, AttributeError) as exc:
        raise AssistantError("Unexpected response from Gemini API") from exc
    if not reply:
        raise AssistantError("Gemini API returned an empty reply")
    return reply.strip()


def chat_stream(messages: list[dict]) -> Iterator[str]:
    """Stream the assistant reply as it is generated, yielding text pieces.

    The connection is opened eagerly (so HTTP errors raise *before* the first
    yield), then Gemini's SSE chunks are parsed and only the visible text parts
    are yielded — reasoning output, if any, is dropped.
    """
    response = _open(messages, stream=True)

    def _iterate() -> Iterator[str]:
        with response:
            for raw in response:
                line = raw.decode("utf-8", "replace").strip()
                if not line.startswith("data:"):
                    continue
                data = line[len("data:") :].strip()
                try:
                    chunk = json.loads(data)
                    candidate = chunk["candidates"][0]
                except (ValueError, KeyError, IndexError):
                    continue
                yield from _texts(candidate)

    return _iterate()
