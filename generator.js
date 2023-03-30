const fs = require('fs');
const path = require('path');
const xl = require('excel4node');

const wb = new xl.Workbook();
const ws = wb.addWorksheet('Worksheet Name');

const generator = (option, missingFields) => {
  const isBackoffice = option === 'backoffice';
  const isUpdate = !!missingFields;

  const sourceFolder = isBackoffice ? 'backoffice' : 'mobile';
  const sourcePath = path.join(
    __dirname,
    `/source/${sourceFolder}/extracted.json`
  );

  const original = fs.readFileSync(sourcePath);
  const parsedOriginal = JSON.parse(original);

  const outputFileNameIndicator = isBackoffice ? 'backoffice' : 'mobile';

  const outputFileName = isUpdate
    ? outputFileNameIndicator + '-updated'
    : outputFileNameIndicator;

  const output = path.join(
    __dirname,
    `/output/${sourceFolder}/${outputFileName}.xlsx`
  );

  let data;
  if (isUpdate) {
    data = missingFields.map((key) => {
      return {
        Id: key,
        Description: parsedOriginal[key].description,
        Swedish: parsedOriginal[key].defaultMessage,
      };
    });
  } else {
    data = Object.keys(parsedOriginal).map((key) => {
      return {
        Id: key,
        Description: parsedOriginal[key].description,
        Swedish: parsedOriginal[key].defaultMessage,
      };
    });
  }

  console.log(
    `original: ${Object.keys(parsedOriginal).length} rows, updated: ${
      data.length
    } rows`
  );

  const headingColumnNames = ['Id', 'Description', 'Swedish'];

  // Write Column Title in Excel file
  let headingColumnIndex = 1;
  headingColumnNames.forEach((heading) => {
    ws.cell(1, headingColumnIndex++).string(heading);
  });

  // Write Data in Excel file
  let rowIndex = 2;
  data.forEach((record) => {
    let columnIndex = 1;
    Object.keys(record).forEach((columnName) => {
      ws.cell(rowIndex, columnIndex++).string(record[columnName]);
    });
    rowIndex++;
  });

  wb.write(output);
};

module.exports = generator;
