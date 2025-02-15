#!/bin/bash

# S3 sync and CloudFront invalidation function
sync_to_s3_and_invalidate() {
  local dir=$1
  local path=$2
  local cloudfront_path=$3

  echo "Syncing $dir app to S3"
  aws s3 sync ./$dir/dist/ s3://mfa-template-s3/$path --exclude "index.html"
  aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_ID --paths "$cloudfront_path"
}

# Loop through missed directories and deploy
for dir in $MISS_DIRS; do
  case "$dir" in
    "shell")
      sync_to_s3_and_invalidate "apps/_shell" "" "/"
      ;;
    "health")
      sync_to_s3_and_invalidate "apps/health" "health" "/health/assets/remoteEntry.js"
      ;;
    "insurance")
      sync_to_s3_and_invalidate "apps/insurance" "insurance" "/insurance/assets/remoteEntry.js"
      ;;
    "mydata")
      sync_to_s3_and_invalidate "apps/mydata" "mydata" "/mydata/assets/remoteEntry.js"
      ;;
    *)
      echo "Unknown directory: $dir"
      ;;
  esac
done

echo "Deployment complete!"
