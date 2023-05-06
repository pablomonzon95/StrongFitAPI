import { User } from "../../interface/users";

const getPool = require("../../database/getPool");

const selectUserById = async (id:number):Promise<User> => {
  const pool = getPool();
  const [[user]] = await pool.query("SELECT * FROM users WHERE id = ?", [
   id,
  ]);
  return user;
};

module.exports = selectUserById;
