#!/bin/bash
cd $(dirname $(realpath $0))/..
# clean git changes
git reset --hard 
git pull
git checkout main
