const insertUser = require("./insertUser");
const selectUserByEmail = require("./selectUserByEmail")
const selectUserByRegistrationCode = require("./selectUserByRegistrationCode")
const deleteRegistrationCode = require("./deleteRegistrationCode")
const selectUserById = require("./selectUserById")
const editUserById = require("./editUserById")

module.exports = {insertUser, selectUserByEmail, selectUserByRegistrationCode, deleteRegistrationCode, selectUserById, editUserById};