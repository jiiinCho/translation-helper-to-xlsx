const fs = require('fs');
const path = require('path');
const generator = require('./generator');

/**
 * Find missing fields by comparing ./json/backoffice/translated.json to ./source/backoffice/extracted.json
 * @param {string} option backoffice or mobile
 * @returns .xlsx file with rows needs to be translated
 */
const getDifference = (option) => {
  const isBackoffice = option === 'backoffice';

  const sourceFolder = isBackoffice ? 'backoffice' : 'mobile';
  const sourceFileFolder = path.join(__dirname, `/json/${sourceFolder}`);
  const sourceFileName = fs.readdirSync(sourceFileFolder)[0];
  const sourceFile = fs.readFileSync(
    path.join(sourceFileFolder, sourceFileName)
  );
  const source = JSON.parse(sourceFile);

  const compiledFile = fs.readFileSync(
    path.join(__dirname, `/source/${sourceFolder}/compiled.json`)
  );
  const compiled = JSON.parse(compiledFile);

  const missingFields = Object.keys(compiled).filter((key) => {
    const hasValue = !!source[key];
    return !hasValue;
  });

  generator(option, missingFields);
};

module.exports = getDifference;
