import { User } from "../../interface/users";

const getPool = require("../../database/getPool");

const insertUser = async (user:User) : Promise<number> => {
  const { email, encryptedPassword, registrationCode, avatar } = user;
  const pool = getPool();
  const [{ insertId }] = await pool.query(
    "INSERT INTO users (email, password, registrationCode, avatar) VALUES (?,?,?,?)",
    [email, encryptedPassword, registrationCode, avatar]
  );

  return insertId;
};

module.exports = insertUser;