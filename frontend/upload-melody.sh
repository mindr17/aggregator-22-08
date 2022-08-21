#!/bin/bash
PROJECT_NAME="melody"
HOST="melody"
# FRONTEND_DIR="/var/www/html/public"
FRONTEND_DIR="/root/backend"

echo "Uploading"
npm run build

echo "Uploading"
rsync --files-from=rsync-files -r --delete . $HOST:$FRONTEND_DIR || exit 2

echo "DONE"
