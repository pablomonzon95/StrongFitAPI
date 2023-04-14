const { createExerciseSchema } = require("../../schemas")
const { insertExercise } = require("../../repositories/exercises");
const { processAndSaveImage } = require("../../utils");


/**
 * Function that validates data from body of the user petition, and creates a new exercise
 */

const createExercise = async (req, res, next) => {
  try {
    const userId = req.auth.id;


    await createExerciseSchema.validateAsync(req.body);
    const {type, movility, name, description} = req.body;

    let media;
    if (req.files) {
      const image = req.files.media;

      media = await processAndSaveImage(image.data);
    } else {
      media = "No images";
    }

    const idExercise = await insertExercise({
      type,
      movility,
      name,
      description,
      media,
      userId,
    });

    res.status(200).send({
      status: "ok",
      data: {
        id: idExercise,
        movility:movility,
        type: type,
        name: name,
        media:media,
        userId: userId,
        
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createExercise;