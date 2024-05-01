#!/bin/bash

docker build -t hbp-api .
docker run --rm -i -d --name hbp-api-lab -p 8081:8080 hbp-api