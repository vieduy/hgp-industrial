#!/usr/bin/env bash
# Deploy the HGP Industrial site to Google Cloud Run.
#
# Prerequisites (one-time):
#   1. Install the gcloud CLI:  https://cloud.google.com/sdk/docs/install
#   2. gcloud auth login
#   3. gcloud config set project <YOUR_PROJECT_ID>
#   4. gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com
#
# Usage:
#   ./deploy.sh                 # uses defaults below
#   REGION=asia-southeast1 SERVICE=hgp-web ./deploy.sh
#
# Cloud Build reads the Dockerfile in this directory, builds the image, pushes
# it to Artifact Registry and deploys it to Cloud Run — all from one command.
set -euo pipefail

SERVICE="${SERVICE:-hgp-web}"
REGION="${REGION:-asia-southeast1}"   # Singapore — closest region to Vietnam

echo "Deploying '$SERVICE' to Cloud Run in '$REGION'..."

gcloud run deploy "$SERVICE" \
  --source . \
  --region "$REGION" \
  --platform managed \
  --allow-unauthenticated \
  --port 8080 \
  --cpu 1 \
  --memory 512Mi \
  --min-instances 0 \
  --max-instances 3

echo
echo "Done. Service URL:"
gcloud run services describe "$SERVICE" --region "$REGION" \
  --format 'value(status.url)'
