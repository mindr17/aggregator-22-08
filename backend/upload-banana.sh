HOST="banana"
BACKEND_DIR="/root/aggregator/backend"

echo "Building"
npm run build

echo "Uploading"
rsync --files-from=rsync-files -r --delete . $HOST:$BACKEND_DIR || exit 2

echo "Restarting process"
ssh $HOST pm2 reload aggregator-backend || exit 4

echo "DONE"