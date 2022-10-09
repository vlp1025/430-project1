const http = require('http');
const url = require('url');

const express = require('express');

const app = express();

app.use(express.static(`${__dirname}/client`));

const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');
const imageHandler = require('./imageResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
  '/addNote': jsonHandler.addNote,
  '/getNotes': jsonHandler.getNotes,
  '/devices.png': imageHandler.getImage1,
  '/bg.png': imageHandler.getImage2,
  notFound: jsonHandler.notFound,
};

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/client.html`);
});

const onRequest = (request, response) => {
  // response.sendFile(__dirname + '/client.html');

  const parsedUrl = url.parse(request.url, true);
  const handlerFunction = urlStruct[parsedUrl.pathname];

  const { query } = parsedUrl;
  if (handlerFunction) {
    handlerFunction(request, response, query);
  } else {
    urlStruct.notFound(request, response, query);
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
});
