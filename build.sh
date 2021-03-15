#!/bin/sh

cd door
yarn build
rm -rf ../metal/public/door.js
mv -f dist/main.js ../metal/public/door.js

cd ../real
yarn build
rm -rf ../metal/public/alo
mv -f build ../metal/public/alo
#cp src/img/** ../metal/public/img
