#!/bin/bash
cd $(dirname $(realpath $0))/..
sudo ln -sf ./systemd.service /etc/systemd/system/le-ou-la-fastapi.service
