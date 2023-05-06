import { NextFunction, Request, Response } from "express";
import AuthRequest, { AuthPayload } from "../../interface/reqAuthorization";

const { selectDiets } = require("../../repositories/diets");

/**
 * FThis function shows the name of the exercises posted by the admin and the media related.
 */

const getDiets = async (req:AuthPayload, res:Response, next:NextFunction) => {
  try {
    const { id } = req.auth;

    const diets = await selectDiets();
    const titleMedia = [];
    for (const diet of diets) {
      titleMedia.push({
        id: diet.id,
        name: diet.name,
        media: diet.media,
      });
    }

    res.status(200).send({ status: "ok", data: titleMedia });
  } catch (error) {
    next(error);
  }
};
module.exports = getDiets;