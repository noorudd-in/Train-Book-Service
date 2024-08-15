const success = Object.freeze({
    OK: 200,
    CREATED: 201,
  });
  
  const client = Object.freeze({
    BAD_REQUEST: 400,
    UNAUTHORISED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
  });
  
  const server = Object.freeze({
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
  });
  module.exports = { success, client, server };
  