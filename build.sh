#!/bin/bash

echo "Resolving app dependencies & generating its build"

(cd app && npm install && npm run build)