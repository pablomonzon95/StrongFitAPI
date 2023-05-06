import Joi from "joi";

const editUserSchema = Joi.object({
    password: Joi.string().min(5).max(20),
    image:Joi.string().valid("on", "off"),
})

module.exports = editUserSchema;
