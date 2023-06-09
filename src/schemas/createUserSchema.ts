import Joi from "joi";

const createUserSchema = Joi.object({
  email: Joi.string().email().min(5).max(100).required(),
  password: Joi.string().min(5).max(20).required(),
  role: Joi.string().min(5).max(6),
});

module.exports = createUserSchema ;
