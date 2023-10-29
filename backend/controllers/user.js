const User = require("../models/user");
const { setCookie } = require("../utils/setCookie");
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req?.body;
  if (!email || !name || !password) {
    res.status(400);
    throw new Error("Fields cannot be empty");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ email, name, password });

  if (!user) {
    res.status(400);
    throw new Error("Something went wrong");
  }

  res.status(201).json({ id: user?._id, name: user?.name, email: user?.email });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req?.body || {};

  if (!email || !password) {
    res.status(400);
    throw new Error("Fields cannot be empty");
  }

  const user = await User.findOne({ email });

  if (user && (await user.comparePasswords(password))) {
    await setCookie(res, user._id);
    res.status(200).json({ id: user._id, email: user.email, name: user.name });
  } else {
    res.status(400).json({ message: "Invalid Credentials" });
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const { user } = req || {};
  res.status(200).json({ id: user._id, email: user.email, name: user.name });
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(400);
    throw new Error("User not found!");
  }

  const { name, email, password } = req?.body || {};
  if (!email || !name) {
    throw new Error("Fields cannot be empty");
  }

  user.name = name;
  user.email = email;

  if (password) {
    user.password = password;
  }

  const updatedUser = await user.save();

  if (!updatedUser) {
    res.status(400);
    throw new Error("Something went wrong!");
  }

  res
    .status(200)
    .json({
      id: updatedUser._id,
      email: updatedUser.email,
      name: updatedUser.name,
    });
});

const logoutUser = (req, res) => {
  res.cookie("jwt", null, {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "logout user successfully!" });
};

module.exports = {
  registerUser,
  loginUser,
  updateUserProfile,
  getUserProfile,
  logoutUser,
};
