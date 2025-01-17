const bcrypt = require("bcrypt");

export const encryptPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const isPasswordValid = async (
  password: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(password, hashedPassword);
};
