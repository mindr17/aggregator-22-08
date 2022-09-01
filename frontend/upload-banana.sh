#!/bin/bash
HOST="banana"
FRONTEND_DIR="/root/aggregator/frontend"

echo "Uploading"
npm run build

echo "Uploading"
rsync --files-from=rsync-files -r --delete . $HOST:$FRONTEND_DIR || exit 2

echo "Restarting process"
ssh $HOST pm2 reload aggregator-frontend || exit 4

echo "DONE"