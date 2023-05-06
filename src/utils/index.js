//We store here useful functions that will be used in all the project.

const generateError = require("./generateError.");
const sendMail = require("./sendMail");
const processAndSaveImage = require("./processAndSaveImage");

module.exports = { generateError, sendMail, processAndSaveImage };
