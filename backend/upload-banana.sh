PROJECT_NAME="aggregator-backend"
HOST="banana"
BACKEND_DIR="/root/aggregator/backend"

echo "Building"
npm run build

echo "Uploading"
rsync --files-from=rsync-files -r --delete . $HOST:$BACKEND_DIR || exit 2

# RESULT=`ssh $HOST pm2 l -m`
# if [[ $RESULT == *"$PROJECT_NAME"* ]]; then
  echo "Reloading process"
  ssh $HOST pm2 reload $PROJECT_NAME || exit 4
# else
#   echo "Starting process"
#   ssh $HOST pm2 start --name=$PROJECT_NAME --cwd "$TARGET_DIR" "index.js" || exit 5
#   echo "Saving PM2 process list"
#   ssh $HOST pm2 save || exit 6
# fi

echo "DONE"