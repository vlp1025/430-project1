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

  return respondJSON(request, response, 200, responseJSON);
};

const addNote = (request, response, body) => {
  const responseJSON = {
    message: 'Message: All attributes are required,',
  };

  if (!body.importance || !body.name) {
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

  if (status === 201) {
    responseJSON.message = 'Note succesfully created.';
    return respondJSON(request, response, 201, responseJSON);
  }

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

// 200 - Success
const success = (request, response) => {
  const displayObject = {
    message: 'This is a successful response.',
  };

  const stringedObject = JSON.stringify(displayObject);
  return respond(request, response, 200, stringedObject, 'application/json');
};

// 201 - Internal
const created = (request, response) => {
  const displayObject = {
    message: 'The request has been fulfilled and resulted in a new resource being created.',
    id: 'created',
  };

  const stringedObject = JSON.stringify(displayObject);
  return respond(request, response, 201, stringedObject, 'application/json');
};

// 204 - Internal
const noContent = (request, response) => {
  const displayObject = {
    message: 'The server has successfully fulfilled the request and that there is no additional content to send in the response payload body..',
    id: 'noContent',
  };

  const stringedObject = JSON.stringify(displayObject);
  return respond(request, response, 204, stringedObject, 'application/json');
};

// 400 - Bad Request
const badRequest = (request, response, params) => {
  if (!params.valid || params.valid !== 'true') {
    const displayObject = {
      message: 'Missing valid query parameter set to true.',
      id: 'badRequest',
    };

    const stringedObject = JSON.stringify(displayObject);
    return respond(request, response, 400, stringedObject, 'application/json');
  }

  const displayObject = {
    message: 'You have all the valid parameters',
  };

  const stringedObject = JSON.stringify(displayObject);
  return respond(request, response, 200, stringedObject, 'application/json');
};

// 500 - Internal
const internal = (request, response) => {
  const displayObject = {
    message: 'Internal Server Error. Something went wrong',
    id: 'internalError',
  };

  const stringedObject = JSON.stringify(displayObject);
  return respond(request, response, 500, stringedObject, 'application/json');
};

module.exports = {
  getNotes,
  addNote,
  created,
  badRequest,
  noContent,
  internal,
  success,
  notFound,
};
