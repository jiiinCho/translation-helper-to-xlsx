const generator = require('./generator');
// const getDifference = require('./getDifference');

const argv = process.argv;

if (argv.length !== 4) {
  console.error("Wrong command: should be 'node index.js operator param'");
  return;
}

const operator = argv[2];
const param = argv[3];

if (operator === 'generate') {
  generator(param);
} else {
  console.error('unknown operator', operator);
}
