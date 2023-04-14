const { generateError } = require("../../utils");
const { userIdSchema } = require("../../schemas");
const { selectDietById, deleteDietById } = require("../../repositories/diets");
const path = require("path");
const fs = require("fs/promises");
/**
 * Function that validate the id from the request, check the note exist and eliminate the diet too.
 * In case the diet has media it also eliminate the media from our filesistem.
 */
const deleteDiet = async (req, res, next) => {
  try {
    const { id } = req.params;

    await userIdSchema.validateAsync(id);

    const diet = await selectDietById(id);
    if (!diet) {
      generateError("diet doesnt exists", 404);
    }

    const loggedUserId = req.auth.id;
    if (diet.userId !== loggedUserId) {
      generateError("you dont have rights to delete this diet", 401);
    }
    let imagePath;
    
    if (diet.media) {
      if (diet.media !== "No images") {
      imagePath = path.join(
        __dirname,
        "..",
        "..",
        "..",
        "docs",
        "media",
       diet.media
      );
      await fs.rm(imagePath);
    }}

    await deleteDietById(id);

    res.status(200).send({ status: "ok", message: "Diet deleted succesfully" });
  } catch (error) {
    next(error);
  }
};
module.exports = deleteDiet;