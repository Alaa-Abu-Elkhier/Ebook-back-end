//@desc this class is responsible about operational error (errors that i can predict)
class ApiError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      //check status code
      this.status = `${statusCode}`.startsWith(4) ? 'failed' : 'error';
      this.isOperational = true;
    }
  }
  
  module.exports = ApiError;
  