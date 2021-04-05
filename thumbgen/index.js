const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const directoryPath = path.join(__dirname, '../metal/public/img/produto');

fs.readdir(directoryPath, function (err, folders) {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  } 

  folders.forEach(function (folder) {
    const categoryFolder = directoryPath + path.sep + folder;
    const thumbDir = categoryFolder + path.sep + 'thumb';
    fs.existsSync(thumbDir) || fs.mkdirSync(thumbDir);

    fs.readdir(categoryFolder, function (err, imgs) {
      imgs.forEach(function (img) {
        sharp(categoryFolder + path.sep + img)
        .rotate()
        .resize(124)
        .toFile(thumbDir + path.sep + img, (err, info) => {
          // console.log(err, info);
        });
      });
    });
  });
});
