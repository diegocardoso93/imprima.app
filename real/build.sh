#!/bin/sh

yarn build
rm -rf ../metal/public/app
mv -f build ../metal/public/app


