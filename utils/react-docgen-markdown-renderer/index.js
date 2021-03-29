const path = require('path');
const fs = require('fs');
const reactDocgen = require('react-docgen');
const template = require('./template');

const sourcePath = path.join(__dirname, '../../src/index.js');

fs.readFile(sourcePath, 'utf8', (error, content) => {
  fs.mkdirSync(path.join(__dirname, '../../docs'), { recursive: true });
  const outputPath = path.join(__dirname, '../../docs/Livemap.md');
  const data = reactDocgen.parse(content, null, null, { filename: sourcePath });

  fs.writeFile(outputPath, template(data), () => {});
});
