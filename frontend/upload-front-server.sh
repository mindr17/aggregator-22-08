PROJECT_NAME="aggregator-frontend"
HOST="banana"
FRONTEND_DIR="/root/aggregator/frontend"

echo "Building"
npm run build

echo "Uploading"
rsync --files-from=rsync-files -r --delete . $HOST:$FRONTEND_DIR || exit 2

RESULT=`ssh $HOST pm2 l -m`
if [[ $RESULT == *"$PROJECT_NAME"* ]]; then
  echo "Reloading process"
  ssh $HOST pm2 reload $PROJECT_NAME || exit 4
else
  # echo "Starting process"
  # ssh $HOST pm2 start npm --watch --ignore-watch="node_modules" --restart-delay=10000 --name "app_name1" -- start
  # echo "Saving PM2 process list"
  # ssh $HOST pm2 save || exit 6
  echo "Reloading process"
fi

echo "DONE"