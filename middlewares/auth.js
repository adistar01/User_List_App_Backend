const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const isLogin = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await User.findOne({ _id: { $eq: decoded.id } });
      next();
    } catch (error) {
      return res.status(401).send({
        error: "Not authorized, token failed!",
      });
    }
  }
};

module.exports = {
  isLogin,
};
