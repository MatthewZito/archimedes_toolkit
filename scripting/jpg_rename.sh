#!/bin/bash
IMAGES=$(ls *.jpg)
DATE=$(date +%F)

for IMAGE in $IMAGES
do
  echo "Renaming ${IMAGE} to ${DATE}-${IMAGE}"
  mv ${IMAGE} ${DATE}-${IMAGE}
done
