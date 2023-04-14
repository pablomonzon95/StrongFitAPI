const getPool = require("../../database/getPool");

const editUserById = async (userToUpdate) => {
  const { id, email, password, role, registrationCode, avatar } = userToUpdate;
  const pool = getPool();



  await pool.query(
    "UPDATE users SET email = ?, password = ?,role = ? , registrationCode = ?, avatar = ? WHERE id = ? ",
    [email, password, role, registrationCode, avatar, id]
  );
};
module.exports = editUserById;