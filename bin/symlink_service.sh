#!/bin/bash
CURRENT_DIR=$(dirname $(realpath $0))
ROOT_DIR=$(realpath $CURRENT_DIR/..)
sudo ln -sf $ROOT_DIR/systemd.service /etc/systemd/system/le-ou-la-fastapi.service
