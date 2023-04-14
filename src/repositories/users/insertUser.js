const getPool = require("../../database/getPool");

const insertUser = async (user) => {
  const { email, encryptedPassword, registrationCode, avatar } = user;
  const pool = getPool();
  const [{ insertId }] = await pool.query(
    "INSERT INTO users (email, password, registrationCode, avatar) VALUES (?,?,?,?)",
    [email, encryptedPassword, registrationCode, avatar]
  );

  return insertId;
};

module.exports = insertUser;