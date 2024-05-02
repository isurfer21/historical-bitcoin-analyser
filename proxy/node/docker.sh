#!/bin/bash

docker build -t hbp-proxy .
docker run --rm -i -d --name hbp-proxy-lab -p 8080:8080 hbp-proxy