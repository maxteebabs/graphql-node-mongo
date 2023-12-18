#!/usr/bin/env bash

echo "stopping api infrastructures..."

#stops all api infrastructures and without removing the containers
docker-compose stop
