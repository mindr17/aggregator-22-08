HOST="banana"
PROJECT_NAME="aggregator-frontend"
BACKEND_DIR="/root/aggregator/frontend"

echo "Building"
npm run build

echo "Uploading"
rsync --files-from=rsync-files -r --delete . $HOST:$BACKEND_DIR || exit 2

echo "Reloading process"
ssh $HOST pm2 reload $PROJECT_NAME || exit 4

echo "DONE"