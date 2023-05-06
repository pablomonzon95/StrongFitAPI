import { NextFunction, Response } from "express";
import { AuthPayload } from "../../interface/reqAuthorization";

const { createSuggestionSchema } = require("../../schemas")
const { insertSuggestion } = require("../../repositories/suggestions");

/**
 * Function that validates data from body of the user petition, and creates a new suggestion from the user to the admin 
 
 */

const createSuggestion = async (req:AuthPayload, res:Response, next:NextFunction) => {
  try {
    const userId = req.auth.id;


    await createSuggestionSchema.validateAsync(req.body);
    const {title, body} = req.body;


    const idSuggestion = await insertSuggestion({
     title,
     body,
    userId,
    });

    res.status(200).send({
      status: "ok",
      data: {
        id: idSuggestion,
        title: title,
        body: body,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createSuggestion;