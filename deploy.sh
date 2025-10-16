#!/bin/bash

# S3 sync and CloudFront invalidation function
sync_to_s3_and_invalidate() {
  local dir=$1
  local path=$2

  echo "Syncing $dir app to S3"
  # If the directory is shell, include index.html, otherwise exclude it
  if [ "$dir" == "apps/_shell" ]; then
    aws s3 sync ./$dir/dist/ s3://mfa-template-s3
  else
    aws s3 sync ./$dir/dist/ s3://mfa-template-s3/$path --exclude "index.html"
  fi
  aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_ID --paths "/*"
}

# Loop through missed directories and deploy
for dir in $MISS_DIRS; do
  case "$dir" in
    "shell")
      sync_to_s3_and_invalidate "apps/_shell" ""
      ;;
    "health")
      sync_to_s3_and_invalidate "apps/health" "health"
      ;;
    "insurance")
      sync_to_s3_and_invalidate "apps/insurance" "insurance"
      ;;
    "mydata")
      sync_to_s3_and_invalidate "apps/mydata" "mydata"
      ;;
    *)
      echo "Unknown directory: $dir"
      ;;
  esac
done
