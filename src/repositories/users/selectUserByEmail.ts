import { User } from "../../interface/users";

const getPool = require("../../database/getPool");

const selectUserByEmail = async (email:string):Promise<User> => {
  const pool = getPool();
  const [[user]] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return user;
};

module.exports = selectUserByEmail;
