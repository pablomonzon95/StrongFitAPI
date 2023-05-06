import Joi from "joi";

const createSuggestionSchema = Joi.object({
    title: Joi.string().max(100).required(),
    body: Joi.string().max(5000).required(),
  });

module.exports = createSuggestionSchema ;
