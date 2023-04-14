const Joi = require("joi");

const createDietSchema = Joi.object({
   
    type: Joi.string().min(4).max(10).required(),
    name: Joi.string().max(100).required(),
    recipe: Joi.string().max(10000).required(),
  });

module.exports = createDietSchema ;
