#!/bin/bash

if [ $1 = "prod" ]; then
    docker compose \
    --project-directory ./ \
    -f _docker/prod.docker-compose.yml \
    ${@:2:$#}
elif [ $1 = "dev" ]; then
    docker compose \
    --project-directory ./ \
    -f _docker/prod.docker-compose.yml \
    -f _docker/dev.docker-compose.yml \
    ${@:2:$#}
fi