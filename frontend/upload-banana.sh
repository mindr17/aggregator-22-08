#!/bin/bash
PROJECT_NAME="aggregator-frontend"
HOST="banana"
FRONTEND_DIR="/root/aggregator/frontend"

echo "Uploading"
npm run build

echo "Uploading"
rsync --files-from=rsync-files -r --delete . $HOST:$FRONTEND_DIR || exit 2

echo "DONE"
