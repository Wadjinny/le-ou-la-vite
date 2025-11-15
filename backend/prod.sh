#!/bin/bash
SCRIPT_DIR=$(dirname $(realpath $0))
ENV_FILE=$SCRIPT_DIR/../.env.production
echo "ENV_FILE: $ENV_FILE"
. $ENV_FILE
echo "API_PORT: $API_PORT"
# single process
$(poetry env activate)
uvicorn backend.main:app --host 0.0.0.0 --port $API_PORT --workers 4
