PROJECT_NAME="aggregator-scraper"
HOST="banana"
BACKEND_DIR="/root/aggregator/scraper/folder"

echo "Building"
npm run build

echo "Uploading"
rsync --files-from=rsync-files -r --delete . $HOST:$BACKEND_DIR || exit 2

echo "Reloading process"
ssh $HOST pm2 reload $PROJECT_NAME || exit 4

echo "DONE"