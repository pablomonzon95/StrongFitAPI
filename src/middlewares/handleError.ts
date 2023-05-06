//Middleware that manages errors

import { NextFunction, Request, Response } from "express";
import CustomError from "../interface/customError";

const handleError = (error:CustomError, req:Request, res:Response, next:NextFunction) => {
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
  