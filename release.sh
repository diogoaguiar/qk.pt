#!/bin/sh
version=$1
dir=releases/v$version

mkdir -p $dir

cp -r bin $dir
mkdir $dir/configs && cp configs/gcloud.json.prod $dir/configs/gcloud.json
cp -r middleware $dir
cp -r routes $dir
cp .dockerignore $dir
cp .gitignore $dir
cp app.js $dir
cp docker-compose.yml $dir
cp Dockerfile $dir
cp package-lock.json $dir
cp package.json $dir
cp README.md $dir

docker build -t qk.pt .

docker tag qk.pt eu.gcr.io/quicky-272322/qk.pt:latest
docker tag qk.pt eu.gcr.io/quicky-272322/qk.pt:$version

docker push eu.gcr.io/quicky-272322/qk.pt:latest
docker push eu.gcr.io/quicky-272322/qk.pt:$version
