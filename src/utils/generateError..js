const generateError = (message, code) => {
  // Create an error with a message as parameter 

  const error = new Error(message);

  // Adds the property statusCode 
  error.statusCode = code;

  // Throw the error, that will be catched by the endpoints in which we use this function
  throw error;
};

module.exports = generateError;