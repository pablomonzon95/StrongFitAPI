import { NextFunction, Request, Response } from "express";

const { generateError } = require("../../utils");
const { selectDietById } = require("../../repositories/diets");
const { userIdSchema } = require("../../schemas");

//Function that allows to see the full description of a diet , having the id in the request

const getDietbyId = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const { id } = req.params;

    await userIdSchema.validateAsync(id);


    const diet = await selectDietById(id);
    if (!diet) {
      generateError("Diet doesnt exists", 404);
    }

    res.status(200).send({ status: "ok", data: diet });
  } catch (error) {
    next(error);
  }
};
module.exports = getDietbyId;
