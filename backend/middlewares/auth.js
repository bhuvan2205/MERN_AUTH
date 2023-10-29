const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const auth = asyncHandler(async (req, res, next) => {
  const token = req?.cookies?.jwt || {};
  if (!token) {
    res.status(401);
    throw new Error("Auth token Required!");
  }

  const decode = await jwt.verify(token, process.env.SECRET_KEY);

  const user = await User.findById(decode?.id).select("-password");
  if (!user) {
    res.status(400);
    throw new Error("Token Expired");
  }
  req.user = user;
  next();
});

module.exports = auth;
