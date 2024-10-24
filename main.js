const fs = require('fs');
const { Command } = require('commander');
const program = new Command();


program
  .requiredOption('-i, --input <path>', 'input file path')
  .option('-o, --output <path>', 'output file path')
  .option('-d, --display', 'display result in console');

program.parse(process.argv);

const options = program.opts();


if (!options.input) {
  console.error('Please, specify input file');
  process.exit(1);
}

if (!fs.existsSync(options.input)) {
  console.error('Cannot find input file');
  process.exit(1);
}

if (!options.output && !options.display) {
  process.exit(0);
}

const data = readJsonFile(options.input);

function readJsonFile(path) {
  
    return JSON.parse(fs.readFileSync(path, 'utf8'));
}
const processedData = processData(data);

function processData(data) {
  let result = '';
  data.forEach(entry => {
    result += `${entry.exchangedate}: ${entry.rate}\n`;
  });
  return result;
}
if (options.display) {
  console.log(processedData);
}
if (options.output) {
  writeToFile(options.output, processedData);
}

function writeToFile(path, data) {
  try {
    fs.writeFileSync(path, data, 'utf8');
    console.log(`Результати записано до  ${path}`);
  } catch (error) {
    console.error('Помилка:', error.message);
  }
}



