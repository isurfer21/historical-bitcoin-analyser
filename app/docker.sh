#!/bin/bash

docker build -t hbp-app .
docker run --rm -i -d --name hbp-app-lab -p 8082:8080 hbp-app