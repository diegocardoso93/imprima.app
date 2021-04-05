#!/bin/sh

cd door
yarn build
rm -rf ../plata/backend/app/app/static/door.js
mv -f dist/main.js ../plata/backend/app/app/static/door.js

cd ../wasp
npm run build
rm -rf ../plata/backend/app/app/static/alo
mv -f build ../plata/backend/app/app/static/alo
#cp src/img/** ../metal/public/img
