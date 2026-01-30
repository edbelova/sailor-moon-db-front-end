#!/bin/sh
set -eu

# Config (override via env vars)
SSH_KEY_PATH="${SSH_KEY_PATH:-$HOME/Documents/smdb-key.pem}"
SSH_USER="${SSH_USER:-ubuntu}"
SSH_HOST="${SSH_HOST:-44.242.4.61}"
SCRIPT_DIR=$(CDPATH= cd "$(dirname "$0")" && pwd)
REMOTE_DEPLOY_DIR="${REMOTE_DEPLOY_DIR:-/home/ubuntu/smdb-deploy}"
SYNC_NGINX_CONF="${SYNC_NGINX_CONF:-0}"
NGINX_CONF_SRC="${NGINX_CONF_SRC:-$SCRIPT_DIR/../webapp/deploy/nginx/conf.d}"

npm --prefix "$SCRIPT_DIR" install
npm --prefix "$SCRIPT_DIR" run build

rsync -av --delete -e "ssh -i $SSH_KEY_PATH" \
  "$SCRIPT_DIR/dist/" \
  "$SSH_USER@$SSH_HOST:$REMOTE_DEPLOY_DIR/nginx/html/"

if [ "$SYNC_NGINX_CONF" = "1" ]; then
  rsync -av --delete -e "ssh -i $SSH_KEY_PATH" \
    "$NGINX_CONF_SRC/" \
    "$SSH_USER@$SSH_HOST:$REMOTE_DEPLOY_DIR/nginx/conf.d/"
  ssh -i "$SSH_KEY_PATH" "$SSH_USER@$SSH_HOST" \
    "cd '$REMOTE_DEPLOY_DIR' && docker compose exec nginx nginx -t"
fi

ssh -i "$SSH_KEY_PATH" "$SSH_USER@$SSH_HOST" \
  "cd '$REMOTE_DEPLOY_DIR' && docker compose exec nginx nginx -s reload"
