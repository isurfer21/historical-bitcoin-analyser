#!/bin/bash

echo "\n# Setup & run docker for API"
(cd api/ && sh docker.sh)

echo "\n# Setup & run docker for App"
(cd app/ && sh docker.sh)

echo "\n# Setup & run docker for Docs"
(cd docs/ && sh docker.sh)

# echo "\n# Setup & run docker for Mock"
# (cd mock/ && sh docker.sh)

echo "\n# Setup & run docker for Reverse Proxy (nginx)"
(cd proxy/nginx/ && sh docker.sh)

# echo "\n# Setup & run docker for Reverse Proxy (node)"
# (cd proxy/node/ && sh docker.sh)