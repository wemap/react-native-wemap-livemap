const path = require('path');
const fs = require('fs');
const reactDocgen = require('react-docgen');
const template = require('./template');

const sourcePath = path.join(__dirname, '../../src/index.js');

fs.readFile(sourcePath, 'utf8', (error, content) => {
  const outputArgNameIndex = process.argv.indexOf('-o');
  const outputArg = process.argv[outputArgNameIndex + 1];

  if (outputArgNameIndex !== -1 && outputArg) {
    const outputPath = path.resolve(outputArg);
    fs.mkdirSync(outputPath, { recursive: true });
    const contentOutputPath = path.join(outputPath, 'Livemap.md');
    const data = reactDocgen.parse(content, null, null, { filename: sourcePath });

    fs.writeFile(contentOutputPath, template(data), () => {});
  } else {
    console.error('Please, provide an output path');
  }
});
