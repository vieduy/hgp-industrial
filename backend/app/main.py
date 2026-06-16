"""FastAPI application for the HGP Industrial showcase website.

Serves two things from one process (and therefore one Docker container):

1. A small JSON API under ``/api/*`` that returns the bilingual site content.
2. The compiled React single-page app (static files), with an ``index.html``
   fallback so client-side routes like ``/catalogue`` work on a hard refresh.

This single-container design is what makes Cloud Run deployment a one-liner.
"""

from __future__ import annotations

import os
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from . import assistant, content

app = FastAPI(
    title="HGP Industrial API",
    description="Content API for the HGP Industrial showcase website.",
    version="1.0.0",
)

# CORS is only needed for local development, where the Vite dev server runs on
# a different origin (http://localhost:5173) than the API. In production the
# SPA is served from the same origin, so this is harmless.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


# ---------------------------------------------------------------------------
# Health + content API
# ---------------------------------------------------------------------------


@app.get("/healthz")
def healthz() -> dict[str, str]:
    """Liveness probe used by Cloud Run / load balancers."""
    return {"status": "ok"}


@app.get("/api/company")
def get_company() -> dict:
    """Company identity, focus areas, audience and contact info."""
    return content.COMPANY


@app.get("/api/about")
def get_about() -> dict:
    """Vision, mission, core values, commitment and thank-you note."""
    return content.ABOUT


@app.get("/api/catalogue")
def get_catalogue() -> list[dict]:
    """The three product / service categories with their spec tables."""
    return content.CATALOGUE


@app.get("/api/partners")
def get_partners() -> list[dict]:
    """Partner brands."""
    return content.PARTNERS


@app.get("/api/projects")
def get_projects() -> list[dict]:
    """Featured projects."""
    return content.PROJECTS


# ---------------------------------------------------------------------------
# Chat assistant
# ---------------------------------------------------------------------------


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: list[ChatMessage]


@app.post("/api/chat")
def post_chat(req: ChatRequest) -> StreamingResponse:
    """Forward the conversation to the LLM gateway and stream the reply.

    Stateless: the frontend sends the full history each time. The persona
    system prompt is added server-side (see :mod:`app.assistant`). The reply is
    streamed back as ``text/plain`` chunks so the UI can render it token by
    token.
    """
    messages = [m.model_dump() for m in req.messages if m.content.strip()]
    if not messages:
        raise HTTPException(status_code=400, detail="No message provided.")
    try:
        # Open the upstream connection now so gateway errors surface as a 502
        # here, before we commit to a streaming 200 response.
        stream = assistant.chat_stream(messages)
    except assistant.AssistantError as exc:
        # 502: we (the API) are fine, but the upstream model failed.
        raise HTTPException(status_code=502, detail=str(exc)) from exc
    return StreamingResponse(stream, media_type="text/plain; charset=utf-8")


# ---------------------------------------------------------------------------
# Static SPA (mounted last so it does not shadow the API routes above)
# ---------------------------------------------------------------------------

# The Docker build copies the compiled frontend (Vite `dist/`) into this folder.
STATIC_DIR = Path(__file__).resolve().parent / "static"

if STATIC_DIR.is_dir():
    # Serve hashed asset bundles etc. directly.
    app.mount(
        "/assets",
        StaticFiles(directory=STATIC_DIR / "assets"),
        name="assets",
    )

    @app.get("/{full_path:path}", response_model=None)
    def spa_fallback(full_path: str) -> FileResponse:
        """Serve a real static file if it exists, else fall back to index.html.

        This lets the React Router handle client-side routes (e.g. a hard
        refresh on ``/catalogue``) while still serving favicons, logos and
        other public assets from disk.
        """
        candidate = (STATIC_DIR / full_path).resolve()
        # Guard against path traversal, then serve the file if present.
        if (
            full_path
            and STATIC_DIR in candidate.parents
            and candidate.is_file()
        ):
            return FileResponse(candidate)
        return FileResponse(STATIC_DIR / "index.html")
else:  # pragma: no cover - only hit when running the API without a built SPA
    @app.get("/")
    def no_frontend() -> JSONResponse:
        return JSONResponse(
            {
                "message": "HGP Industrial API is running. "
                "Frontend not built into this image.",
                "docs": "/docs",
            }
        )


def main() -> None:
    """Entry point for ``python -m app.main`` (dev convenience)."""
    import uvicorn

    port = int(os.environ.get("PORT", "8080"))
    uvicorn.run(app, host="0.0.0.0", port=port)


if __name__ == "__main__":
    main()
