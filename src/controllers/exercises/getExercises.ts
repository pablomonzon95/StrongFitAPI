import { NextFunction, Response } from "express";
import  { AuthPayload } from "../../interface/reqAuthorization";

const { selectExercises } = require("../../repositories/exercises");

/**
 * FThis function shows the name of the exercises posted by the admin and the media related.
 */

const getExercises = async (req:AuthPayload, res:Response, next:NextFunction) => {
  try {
    const { id } = req.auth;

    const exercises = await selectExercises();
    const titleMedia = [];
    for (const exercise of exercises) {
      titleMedia.push({
        id: exercise.id,
        name: exercise.name,
        media: exercise.media,
      });
    }

    res.status(200).send({ status: "ok", data: titleMedia });
  } catch (error) {
    next(error);
  }
};
module.exports = getExercises;