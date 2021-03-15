#!/bin/sh

yarn build
rm -rf ../metal/public/door.js
mv -f dist/main.js ../metal/public/door.js
