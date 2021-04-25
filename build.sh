#!/bin/sh

cd wasp
npm run build
rm -rf ../plata/backend/app/app/static/alo
mv -f build ../plata/backend/app/app/static/alo
mv -f ../plata/backend/app/app/static/alo/index.html ../plata/backend/app/app/templates/criador.html 
#cp src/img/** ../metal/public/img
