#!/bin/bash

echo "Running all servers along with reverse-proxy"

(cd api && node api.js -p=8081) &
node static-server.js -p=8082 -d=./app/build &
node static-server.js -p=8083 -d=./mock &
node static-server.js -p=8084 -d=./docs &
node reverse-proxy.js -p=8080 -c=./proxy-config.json