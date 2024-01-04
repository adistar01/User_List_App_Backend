const User = require("../models/userModel");
const {
  generateToken,
  matchPassword,
  hashPassword,
} = require("../utils/utils");

const signUpController = async (req, res) => {
  const { name, email, phone, password, gender, hear_About, city, state } =
    req.body;

  if (
    !name ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !hear_About ||
    !city ||
    !state
  ) {
    return res.status(400).send({
      error: "Enter all the required fields",
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        message: "User already exists. Please login!",
      });
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await new User({
      email,
      password: hashedPassword,
      name,
      phone,
      gender,
      hear_about: hear_About,
      city,
      state,
    }).save();
    const token = generateToken(newUser._id);
    return res.status(201).send({
      message: "User created successfully",
      newUser,
      token,
    });
  } catch (error) {
    console.log("Error : ", error);
    return res.status(500).send({
      error: "Internal Server Error",
    });
  }
};
const loginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({
      error: "Enter all the required fields",
    });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).send({
        error: "No such email registered",
      });
    }
    const match = await matchPassword(password, existingUser.password);
    if (!match) {
      return res.status(404).send({
        error: "Invalid Password!",
      });
    }
    const token = generateToken(existingUser._id);
    return res.status(200).send({
      message: "User login successfully",
      user: existingUser,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      error: "Internal Server error",
    });
  }
};

module.exports = {
  loginController,
  signUpController,
};
