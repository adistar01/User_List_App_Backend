const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const hashPassword = async (password) => {
  try {
    const salt = 10;
    const encryptedPassword = await bcrypt.hash(password, salt);
    return encryptedPassword;
  } catch (error) {
    console.log("Error in encrypting password! ", error);
  }
};

const matchPassword = async (password, userPassword) => {
  return await bcrypt.compare(password, userPassword);
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
};

module.exports = {
  hashPassword,
  generateToken,
  matchPassword,
};
