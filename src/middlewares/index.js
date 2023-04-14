const validateAuth = require("./validateAuth")
const handleError = require("./handleError")
const handleNotFound = require("./handleNotFound")
const checkAdmin = require("./checkAdmin")

module.exports = {validateAuth, handleNotFound, handleError, checkAdmin}