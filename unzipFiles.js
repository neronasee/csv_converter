const minizip = require('node-minizip');

const unzipFiles = (inputFilePath, outputFolder) => {
  return new Promise((resolve, reject) => {
    minizip.unzip(inputFilePath, outputFolder, (err) => {
      if (err) return reject(err);

      resolve('Successful unzip');
    });
  });
};

module.exports = unzipFiles;
