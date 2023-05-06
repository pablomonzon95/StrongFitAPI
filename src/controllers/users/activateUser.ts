import { NextFunction, Request, Response } from "express";

const {
    selectUserByRegistrationCode,
    deleteRegistrationCode,
  } = require("../../repositories/users");
  const { generateError } = require("../../utils");
  /**
   * Function in charge of activate the recents registered users.
   * it checks the register Code and eliminates it from the database so the user can log in.
   */
  const activateUser = async (req:Request, res:Response, next:NextFunction) => {
    try {
      const { registrationCode} = req.params;
  
      const user = await selectUserByRegistrationCode(registrationCode);
  
      if (!user) {
        generateError("Invalid registration code or user already activated", 400);
      }
  
      await deleteRegistrationCode(registrationCode);
  
      res
        .status(200)
        .send({ status: "ok", message: "User activated succesfully!" });
    } catch (error) {
      next(error);
    }
  };
  
  module.exports = activateUser;
  