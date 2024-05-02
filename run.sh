#!/bin/bash

echo "Running all servers along with reverse-proxy"

(cd api && node api.js -a=0.0.0.0 -p=8081) &
(node tools/static-server.js -a=0.0.0.0 -p=8082 -d=../app/build) &
(node tools/static-server.js -a=0.0.0.0 -p=8083 -d=../mock) &
(node tools/static-server.js -a=0.0.0.0 -p=8084 -d=../docs) &
(node tools/reverse-proxy.js -a=0.0.0.0 -p=8080 -c=./proxy-config.json)