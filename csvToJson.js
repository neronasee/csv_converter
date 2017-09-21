const csv = require('csvtojson');

const csvToJson = (filePath) => {
  return new Promise((resolve, reject) => {
    csv({
      toArrayString: true,
      delimiter: '||',
    })
      .fromFile(filePath)
      .on('end_parsed', (data) => {
        resolve(data);
      })
      .on('done', (err) => {
        if (err) return reject(err);
      });
  });
};

module.exports = csvToJson;
