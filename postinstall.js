const fs = require('fs');
const path = require('path');
const ncp = require('ncp').ncp;

const source = path.join(__dirname, 'my-folder');
const destination = path.join(process.cwd(), 'my-folder');

ncp(source, destination, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log('Folder copied successfully!');
});
