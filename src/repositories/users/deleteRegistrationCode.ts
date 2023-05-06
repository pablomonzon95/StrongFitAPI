const getPool = require("../../database/getPool");

const deleteRegistrationCode = async (registrationCode: string): Promise<void> => {
  const pool = getPool();

  await pool.query(
    "UPDATE users SET registrationCode = NULL WHERE registrationCode = ?",
    [registrationCode]
  );
};

module.exports = deleteRegistrationCode;
