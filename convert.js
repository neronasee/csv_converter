const fs = require('fs-extra');
const path = require('path');
const moment = require('moment');
const csvToJson = require('./csvToJson');
const unzipFiles = require('./unzipFiles');
const readIntoOne = require('./readIntoOne');

const tempDir = path.join(__dirname, 'temp');
const outputDir = path.join(__dirname, 'output');

const convert = async (zipFilePath) => {
  try {
    await fs.emptyDir(tempDir);
    await fs.emptyDir(outputDir);

    await unzipFiles(zipFilePath, tempDir);

    const concatenatedData = await readIntoOne(tempDir);
    await fs.appendFile(path.join(tempDir, 'temp.csv'), concatenatedData.join(''));

    const convertedData = await csvToJson(path.join(tempDir, 'temp.csv'));

    const mappedData = convertedData.reduce((acc, person) => {
      const {first_name, last_name, phone, amount, date, cc} = person;
      const formatedPerson = {
        'name': `${last_name} ${first_name}`,
        'phone': phone.replace(/[^\d+]+/g, ''),
        'person': {
          'firstName': first_name,
          'lastName': last_name,
        },
        'amount': amount,
        'date': moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD'),
        'costCenterNum': cc.replace(/[^\d+]+/g, ''),
      };

      return person.first_name !== 'first_name' ? [...acc, formatedPerson] : acc;
    }, []);

    await fs.writeFile(path.join(outputDir, 'result.json'), JSON.stringify(mappedData));

    await fs.remove(tempDir);

    console.log('Done');
  } catch (e) {
    console.log(e);
  }
};

module.exports = convert;
