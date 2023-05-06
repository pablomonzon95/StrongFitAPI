import { NextFunction, Request, Response } from "express";
import { AuthPayload } from "../../interface/reqAuthorization";

const { generateError } = require("../../utils");
const { userIdSchema } = require("../../schemas");
const { selectExerciseById, deleteExerciseById } = require("../../repositories/exercises");
const path = require("path");
const fs = require("fs/promises");
/**
 * Function that validate the id from the request, check the note exist and eliminate the exercise too.
 * IIn case the exercise has media it also eliminate the media from our filesistem.
 */
const deleteExercise = async (req:AuthPayload, res:Response, next:NextFunction) => {
  try {
    const { id } = req.params;

    await userIdSchema.validateAsync(id);

    const exercise = await selectExerciseById(id);
    if (!exercise) {
      generateError("Exercise doesnt exists", 404);
    }

    const loggedUserId = req.auth.id;
    if (exercise.userId !== loggedUserId) {
      generateError("you dont have rights to delete this exercise", 401);
    }
    let imagePath;
    
    if (exercise.media) {
      if (exercise.media !== "No images") {
      imagePath = path.join(
        __dirname,
        "..",
        "..",
        "..",
        "docs",
        "media",
        exercise.media
      );
      await fs.rm(imagePath);
    }}

    await deleteExerciseById(id);

    res.status(200).send({ status: "ok", message: "Exercise deleted succesfully" });
  } catch (error) {
    next(error);
  }
};
module.exports = deleteExercise;