const { generateError, processAndSaveImage } = require("../../utils");
const { userIdSchema, editUserSchema } = require("../../schemas");
const { selectUserById, editUserById } = require("../../repositories/users");
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs/promises");


/**
 * This Function is in charge of editing the password or the avatar of the user profile.
 *  It Receives the user's Id as parameter, verifies the user exists and have permission to edit the profile.
 * After that validates the body from the request.

 .
 */
const editUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    await userIdSchema.validateAsync(id);

    const user = await selectUserById(id);

    if (!user) {
      generateError("User doesnt exists", 404);
    }
    // hasta aca por ahora
    const loggedUserId = req.auth.id;
    if (user.id !== loggedUserId) {
      generateError("you dont have rights to edit this profile", 401);
    }

    await editUserSchema.validateAsync(req.body);
 

      
      if (req.body.password){
      if (req.body.password !== user.password ) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      }}
   
    if (req.files) {
      const image = req.files.avatar;
      avatar = await processAndSaveImage(image.data); 
    } 

    
    req.body.avatar = avatar;



 
     let imagePath;

    if (user.avatar !== req.body.avatar && user.avatar !== "No images" && user.avatar !== null) {
      
        imagePath = path.join(
          __dirname,
          "..",
          "..",
          "..",
          "docs",
          "media",
          user.avatar
        );
        await fs.rm(imagePath);
      }
    

    const updatedUser = { ...user, ...req.body };

//hasta aca
    await editUserById(updatedUser);
    res.status(200).send({ status: "ok", data: updatedUser });
  } catch (error) {
    next(error);
  }
};
module.exports = editUser;
