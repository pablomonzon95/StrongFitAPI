const { selectUserByEmail } = require("../../repositories/users");
const { createUserSchema } = require("../../schemas");
const { generateError } = require("../../utils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * Function that validates the body from the request.
 * After that checks we have that user in our database and generates a webToken for the user that will be sent in the response
 */

const loginUser = async (req, res, next) => {
  try {
    console.log(req.body)
    await createUserSchema.validateAsync(req.body);
    const { email, password } = req.body;
    const user = await selectUserByEmail(email);
    if (!user) {
      generateError("Incorrect email or password ", 400);
    }
    if (user.registrationCode) {
      generateError("User not activated. Please check your email", 400);
    }
    const isPasswordOk = await bcrypt.compare(password, user.password);
    if (!isPasswordOk) {
      generateError("Incorrect email or password ", 400);
    }
    const tokenPayload = { id: user.id };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });
    res.status(200).send({ status: "ok", data: { token } , id: user.id });
  } catch (error) {
    next(error);
  }
};
module.exports = loginUser;
