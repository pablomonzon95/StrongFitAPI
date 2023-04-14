const { createDietSchema } = require("../../schemas")
const { insertDiet } = require("../../repositories/diets");
const { processAndSaveImage } = require("../../utils");


/**
 * Function that validates data from body of the user petition,
 */

const createDiet = async (req, res, next) => {
  try {
    const userId = req.auth.id;


    await createDietSchema.validateAsync(req.body);
    const {type, name, recipe} = req.body;

    let media;
    if (req.files) {
      const image = req.files.media;

      media = await processAndSaveImage(image.data);
    } else {
      media = "No images";
    }

    const idDiet = await insertDiet({
      type,
      name,
      recipe,
      media,
      userId,
    });

    res.status(200).send({
      status: "ok",
      data: {
        id: idDiet,
        type: type,
        name: name,
        recipe: recipe,
        media:media,
        userId: userId,
        
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createDiet;