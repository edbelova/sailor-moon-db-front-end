#!/bin/sh
set -eu

# Config (override via env vars)
SSH_KEY_PATH="${SSH_KEY_PATH:-$HOME/Documents/smdb-key.pem}"
SSH_USER="${SSH_USER:-ubuntu}"
SSH_HOST="${SSH_HOST:-44.242.4.61}"
REMOTE_DEPLOY_DIR="${REMOTE_DEPLOY_DIR:-/home/ubuntu/smdb-deploy}"

SCRIPT_DIR=$(CDPATH= cd "$(dirname "$0")" && pwd)

npm --prefix "$SCRIPT_DIR" install
npm --prefix "$SCRIPT_DIR" run build

scp -i "$SSH_KEY_PATH" -r "$SCRIPT_DIR/dist/"* \
  "$SSH_USER@$SSH_HOST:$REMOTE_DEPLOY_DIR/nginx/html/"

ssh -i "$SSH_KEY_PATH" "$SSH_USER@$SSH_HOST" \
  "cd '$REMOTE_DEPLOY_DIR' && docker compose exec nginx nginx -s reload"
