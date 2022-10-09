const fs = require('fs'); // pull in the file system module

const devicesImage = fs.readFileSync(`${__dirname}/../client/devices.png`);
const bgImage = fs.readFileSync(`${__dirname}/../client/bg.png`);

const getImage1 = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'image/png' });
  response.write(devicesImage);
  response.end();
};

const getImage2 = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'image/png' });
  response.write(bgImage);
  response.end();
};

module.exports.getImage1 = getImage1;
module.exports.getImage2 = getImage2;
