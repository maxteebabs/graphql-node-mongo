#!/usr/bin/env bash

BUILD_CONTAINER="--build"
LOCAL_ENV="local"

#pass environment variables
while test $# -gt 0; do
  case "$1" in
    -h|--help)
      echo "options;"
      echo "-h | --help           show brief help"
      echo "--env={ENVIRONMENT}   specify the environment running e.g. local"
      echo "--build               build docker images"
      echo -e "\n"
      exit 0
      ;;
    --build)
      export BUILD="--build"
      shift
      ;;
    *)
      break
      ;;
  esac
done

# this line should work but does not work, hence commented
# source env_overrides/.env.docker_dev

if [ "${BUILD}"  == "${BUILD_CONTAINER}" ]; then
  echo "Building docker images..."
  docker-compose build
fi

echo "Starting backend containers..."
docker-compose up -d