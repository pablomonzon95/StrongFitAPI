const jwt = require("jsonwebtoken");
const { generateError } = require("../utils");

// Middleware that checks if the user is already logged

const validateAuth = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      generateError("Missing authorization", 400);
    }
    const [type, token] = authorization.split(" ");
    if (type !== "Bearer" || !token) {
      generateError("Invalid token format", 400);
    }
    const tokenPayload = jwt.verify(token, process.env.JWT_SECRET);
    req.auth = tokenPayload;
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = validateAuth;