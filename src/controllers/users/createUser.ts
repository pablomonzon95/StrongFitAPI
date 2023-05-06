const { createUserSchema } = require("../../schemas")

const { generateError, sendMail, processAndSaveImage } = require("../../utils");
import bcrypt from "bcrypt";
const { v4: uuidv4 } = require('uuid');
const { insertUser, selectUserByEmail } = require("../../repositories/users");
import { restart } from "nodemon";
import { NextFunction, Request, Response } from "express";
require("dotenv").config();
const { PORT } = process.env;

/**
 * Function that validates data from body of the user petition, it verifies there is not other user in the database with the same e-mail, 
 * it generates a random encripted password and a validation code that will be sended to the user by e-mail
 * Also insert a new user in the database and return a successful message in case everithing is ok 
 */
const createUser = async (req:Request, res:Response, next:NextFunction) => {
  try {
    await createUserSchema.validateAsync(req.body);

    const { email, password } = req.body;

    const user = await selectUserByEmail(email);
    if (user) {
      generateError("Already exists an user with that email", 400);
    }

    let encryptedPassword = await bcrypt.hash(password, 10);
   

    const registrationCode = uuidv4();

    let avatar;
    if (req.files && req.files.avatar) {
      const image = Array.isArray(req.files.avatar)
        ? req.files.avatar[0]
        : req.files.avatar;

      avatar = await processAndSaveImage(image.data);
    } else {
      avatar = "No images";
    }

    const insertId = await insertUser({
      email,
      encryptedPassword,
      registrationCode,
      avatar,
    });

    await sendMail(
      "Welcome to Strong_Fit!!",
      `<p>Here you have your activation link for Strong_Fit!</p> 
      <a href = "http://localhost:${PORT}/activate/${registrationCode}">Activate your account</a>`,
      email
    );
    res.status(201).send({ status: "ok", data: { id: insertId, email } });
  } catch (error) {
    next(error);
  }
};
module.exports = createUser;