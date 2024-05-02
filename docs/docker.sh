#!/bin/bash

docker build -t hbp-docs .
docker run --rm -i -d --name hbp-docs-lab -p 8084:8080 hbp-docs