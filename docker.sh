#!/bin/bash

docker build -t hbp .
docker run --rm -i -d --name hbp-lab -p 8080:8080 hbp