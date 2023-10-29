const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: ["Username cannot be empty"],
    },
    email: {
      type: String,
      unique: true,
      required: ["Username cannot be empty"],
    },
    password: {
      type: String,
      required: ["Username cannot be empty"],
    },
  },
  { timeStamps: true }
);

userSchema.methods.comparePasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(8);
  this.password = await bcrypt.hash(this.password, salt);
});

const user = mongoose.model("User", userSchema);

module.exports = user;
