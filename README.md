# HGP Industrial — Showcase Website

Public showcase site for **HGP Industrial Co., Ltd** (construction materials
trading): protective coatings, fasteners and fireproofing paint for steel
structures.

- **Frontend:** React + Vite (bilingual 🇻🇳 / 🇬🇧 toggle)
- **Backend:** Python + FastAPI (serves a JSON content API **and** the built SPA)
- **Packaging:** one Docker image
- **Deploy target:** Google Cloud Run (one command)

Three pages: **Home**, **Catalogue**, **About Us**. Content is taken from the
company profile & catalogue and lives in one editable file:
`backend/app/content.py`.

---

## Quick start (Docker — recommended)

You only need Docker installed.

```bash
docker compose up --build
```

Open <http://localhost:8080>. That's the exact image that ships to production.

Smoke checks:

```bash
curl http://localhost:8080/healthz        # {"status":"ok"}
curl http://localhost:8080/api/catalogue  # JSON content
```

---

## Local development (hot reload, optional)

Needs Python 3.12+ and Node 20+.

```bash
# Terminal 1 — backend API on :8080
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8080

# Terminal 2 — frontend dev server on :5173 (proxies /api to :8080)
cd frontend
npm install
npm run dev
```

Open <http://localhost:5173>.

---

## Deploy to Google Cloud Run

One-time setup:

```bash
# Install gcloud: https://cloud.google.com/sdk/docs/install
gcloud auth login
gcloud config set project <YOUR_PROJECT_ID>
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com
```

Deploy (builds the Dockerfile via Cloud Build, pushes, and deploys):

```bash
./deploy.sh
# or customise:
REGION=asia-southeast1 SERVICE=hgp-web ./deploy.sh
```

The script prints the public HTTPS URL when finished. The service scales to
**zero** when idle, so it's essentially free for a low-traffic showcase site.

### Custom domain (hgpindustrial.com.vn)

```bash
gcloud beta run domain-mappings create \
  --service hgp-web --domain hgpindustrial.com.vn --region asia-southeast1
```

Then add the DNS records gcloud prints to your domain registrar.

---

## Project structure

```
hgp/
├── backend/
│   ├── app/
│   │   ├── main.py        # FastAPI: /api/*, /healthz, static SPA + fallback
│   │   └── content.py     # ← ALL bilingual site content (edit here)
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── pages/         # Home, Catalogue, About
│   │   ├── components/    # Navbar, Footer, Hero pieces, SpecTable, grids…
│   │   ├── i18n.jsx       # VN/EN language context
│   │   └── styles/        # brand theme (rust #c0411f / cream #f7f0dc)
│   └── public/
│       ├── partners/      # drop real partner logos here (see README inside)
│       └── projects/      # drop real project photos here (see README inside)
├── Dockerfile             # multi-stage: node build → python runtime
├── docker-compose.yml     # local run on :8080
└── deploy.sh              # Cloud Run deploy helper
```

## Editing content

All website text (both languages) is in **`backend/app/content.py`**. Each
string is a `{"vi": "...", "en": "..."}` pair. No rebuild of data is needed —
just restart the container (or the API in dev).

## Adding real images

- **Logo:** replace the inline SVG in `frontend/src/components/Logo.jsx` (and
  `frontend/public/logo.svg`) with the real eagle logo.
- **Hero background:** the homepage hero uses `frontend/public/hero.jpg`
  (currently a copy of the BW Industrial photo). Replace that file to change the
  hero image — no code change needed.
- **Partner logos:** drop files into `frontend/public/partners/`
  (see filenames in the README there).
- **Project photos:** drop files into `frontend/public/projects/`.

Until real assets are added, the site shows tasteful branded fallbacks
(wordmarks / gradient placeholders), so nothing looks broken.
