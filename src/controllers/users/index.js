/**
 * Here we keep the users controllers for being imported to the server.js
 */
const createUser = require("./createUser");
const activateUser = require("./activateUser")
const loginUser = require("./loginUser")
const editUser = require ("./editUser")

module.exports = { createUser, activateUser, loginUser, editUser};
