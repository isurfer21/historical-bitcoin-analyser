#!/bin/bash

(NODE_ENV=dev node api.js -a=0.0.0.0 -p=8081) &
(node ../tools/static-server.js -a=0.0.0.0 -p=8083 -d=../mock) & 
(node ../tools/reverse-proxy.js -a=0.0.0.0 -p=8080 -c=./test-proxy-config.json) & 

sleep 0.3

if [ -d test ]; then
  echo "\nStart testing ...\n"
  (node test/api.test.js) &&
  (node test/lib/cli-parser.test.js) &&
  (node test/lib/http-wrapper.test.js) &&
  (node test/lib/rest-api.test.js) &&
  (node test/lib/fin/currencies-list.test.js) &&
  (node test/lib/fin/exchange-rates.test.js) &&
  (node test/lib/fin/historical-prices.test.js) &&
  (node test/lib/biz/hbp-extractor.test.js) &&
  echo "\nStop testing!\n"
fi 

kill $(lsof -t -i:8081) &
kill $(lsof -t -i:8083) & 
kill $(lsof -t -i:8080)