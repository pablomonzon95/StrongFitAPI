//Middleware that manages the errors type 404

import { Request, Response } from "express";

const handleNotFound = (req:Request, res:Response) => {
    res.status(404).send({ status: "error", message: "Not found" });
  };
  
  module.exports = handleNotFound;
  