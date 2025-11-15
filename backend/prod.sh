#!/bin/bash
SCRIPT_DIR=$(dirname $(realpath $0))
ENV_FILE=$SCRIPT_DIR/../.env
echo "ENV_FILE: $ENV_FILE"
. $ENV_FILE
echo "API_PORT: $VITE_API_PORT"
# single process
$(poetry env activate)
uvicorn backend.main:app --host 0.0.0.0 --port $VITE_API_PORT --workers 4
