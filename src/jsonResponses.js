const notes = {};

const respondJSON = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

const getNotes = (request, response) => {
  const responseJSON = {
    notes,
  };
  // 200
  return respondJSON(request, response, 200, responseJSON);
};

const addNote = (request, response, body) => {
  const responseJSON = {
    message: 'Message: All attributes are required,',
  };

  // 400
  if (!body.importance || !body.name || !body.description || !body.start || !body.yourName) {
    responseJSON.id = 'addMissingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let status = 204;

  if (!notes[body.name]) {
    status = 201;
    notes[body.name] = {};
  }

  notes[body.name].importance = body.importance;
  notes[body.name].description = body.description;
  notes[body.name].start = body.start;
  notes[body.name].title = body.title;
  notes[body.name].yourName = body.yourName;

  // 201
  if (status === 201) {
    responseJSON.message = 'Note succesfully created.';
    return respondJSON(request, response, 201, responseJSON);
  }
  // 204
  responseJSON.message = 'No content to create.';
  return respondJSON(request, response, 204, responseJSON);
};

const respond = (request, response, status, content, type) => {
  const types = {
    'Content-Type': type,
  };

  response.writeHead(status, types);
  response.write(content);
  response.end();
};

// 404 - Not Found
const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  respondJSON(request, response, 404, responseJSON);
};


module.exports = {
  getNotes,
  addNote,
  notFound,
};
