#!/bin/bash
cd $(dirname $(realpath $0))/..
rsync -avz .env* ubuntu@129.153.9.6:/home/ubuntu/thinkering/le-ou-la-vite