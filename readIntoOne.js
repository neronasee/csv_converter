const fs = require('fs-extra');
const path = require('path');

const readIntoOne = (inputFolderPath) => {
  return new Promise((resolve, reject) => {
    const tasks = [];

    fs.readdir(inputFolderPath, (err, files) => {
      if (err) return reject(err);

      for (let i = 0; i < files.length; i++) {
        const fileName = files[i];
        fileName.endsWith('csv') && tasks.push(fs.readFile(path.join(inputFolderPath, fileName)));
      }

      resolve(Promise.all(tasks));
    });
  });
};

module.exports = readIntoOne;
