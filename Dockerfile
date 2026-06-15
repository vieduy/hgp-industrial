# syntax=docker/dockerfile:1

# ---------- Stage 1: build the React frontend ----------
FROM node:20-slim AS frontend
WORKDIR /fe
# Install deps first for better layer caching.
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm install
COPY frontend/ ./
RUN npm run build          # outputs /fe/dist

# ---------- Stage 2: Python runtime serving API + built SPA ----------
FROM python:3.12-slim AS runtime
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PORT=8080
WORKDIR /app

COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Backend code.
COPY backend/app ./app
# Built frontend → served as static files by FastAPI.
COPY --from=frontend /fe/dist ./app/static

EXPOSE 8080
# Cloud Run injects $PORT; default to 8080 locally. Use shell form so $PORT expands.
CMD exec uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8080}
