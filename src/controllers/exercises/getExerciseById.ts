import { NextFunction, Request, Response } from "express";

const { generateError } = require("../../utils");
const { selectExerciseById } = require("../../repositories/exercises");
const { userIdSchema } = require("../../schemas");

//Function that allows to see the full description of an exercise, having the id in the request

const getExercisebyId = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const { id } = req.params;

    await userIdSchema.validateAsync(id);


    const exercise = await selectExerciseById(id);
    if (!exercise) {
      generateError("Exercise doesnt exists", 404);
    }

    res.status(200).send({ status: "ok", data: exercise });
  } catch (error) {
    next(error);
  }
};
module.exports = getExercisebyId;
