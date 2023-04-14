const { generateError } = require("../../utils");
const { selectSuggestionById } = require("../../repositories/suggestions");
const { userIdSchema } = require("../../schemas");

//Function that allows to see the full title and body of the suggestion , having the id in the request

const getSuggestionbyId = async (req, res, next) => {
  try {
    const { id } = req.params;

    await userIdSchema.validateAsync(id);


    const suggestion = await selectSuggestionById(id);
    if (!suggestion) {
      generateError("Suggestion doesnt exists", 404);
    }

    res.status(200).send({ status: "ok", data: suggestion });
  } catch (error) {
    next(error);
  }
};
module.exports = getSuggestionbyId;
