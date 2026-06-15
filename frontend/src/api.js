// Thin fetch wrapper around the FastAPI content endpoints. In both dev (Vite
// proxy) and production (same origin) these are simple relative paths.

async function get(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`${path} → ${res.status}`);
  return res.json();
}

export const api = {
  company: () => get("/api/company"),
  about: () => get("/api/about"),
  catalogue: () => get("/api/catalogue"),
  partners: () => get("/api/partners"),
  projects: () => get("/api/projects"),
};
