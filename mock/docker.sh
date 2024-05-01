#!/bin/bash

docker build -t hbp-mock .
docker run --rm -i -d --name hbp-mock-lab -p 8083:8080 hbp-mock