//Middleware that manages errors

const handleError = (error, req, res, next) => {
    console.error(error);
  
    // if the error is "ValidationError" we choose a statusCode = 400
    if (error.name === "ValidationError") {
      error.statusCode = 400;
    }
  
    // an answer with the error status and message is sent 
    res
      .status(error.statusCode || 500)
      .send({ status: "error", message: error.message });
  };
  
  module.exports = handleError;
  