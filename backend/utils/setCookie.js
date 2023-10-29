const generateToken = require("./generateToken");

const setCookie = async (res, id) => {
  const token = await generateToken(id);
  res.cookie("jwt", token, {
    secure: process.env.NODE_ENV !== "dev",
    sameSite: "strict",
    httpOnly: true,
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });
};

module.exports = { setCookie };
