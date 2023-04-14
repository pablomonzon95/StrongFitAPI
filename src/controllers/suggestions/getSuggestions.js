const { selectSuggestions } = require("../../repositories/suggestions");

/**
 * This function shows the title and user email of the suggestions sended by the users to the admin.
 * Only the admin can see all the suggestions
 */

const getSuggestions = async (req, res, next) => {
  try {
    const { id } = req.auth;

    const suggestions  = await selectSuggestions();
    const title = [];
    for (const suggestion of suggestions) {
      title.push({
        email: suggestion.email,
        title: suggestion.title
      });
    }

    res.status(200).send({ status: "ok", data: title });
  } catch (error) {
    next(error);
  }
};
module.exports = getSuggestions;