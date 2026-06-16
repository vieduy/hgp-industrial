// Thin fetch wrapper around the FastAPI content endpoints. In both dev (Vite
// proxy) and production (same origin) these are simple relative paths.

async function get(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`${path} → ${res.status}`);
  return res.json();
}

// Send the full conversation to the assistant and stream the reply back.
// Stateless: the persona system prompt is added server-side. `onToken` is
// called with each text chunk as it arrives.
async function chatStream(messages, onToken) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });
  if (!res.ok || !res.body) throw new Error(`/api/chat → ${res.status}`);

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });
    if (chunk) onToken(chunk);
  }
}

export const api = {
  company: () => get("/api/company"),
  about: () => get("/api/about"),
  catalogue: () => get("/api/catalogue"),
  partners: () => get("/api/partners"),
  projects: () => get("/api/projects"),
  chatStream,
};
