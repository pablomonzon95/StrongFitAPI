import Joi from "joi";

const createExerciseSchema = Joi.object({
    movility: Joi.string().min(7).max(9).required(),
    type: Joi.string().min(7).max(17).required(),
    name: Joi.string().max(100).required(),
    description: Joi.string().max(10000).required(),
  });

module.exports = createExerciseSchema ;
