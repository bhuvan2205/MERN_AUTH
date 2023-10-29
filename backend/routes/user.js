const { Router } = require("express");
const {
  registerUser,
  loginUser,
  updateUserProfile,
  getUserProfile,
  logoutUser,
} = require("../controllers/user");
const auth = require("../middlewares/auth");

const router = Router();

router.post("/users", registerUser);
router.post("/users/auth", loginUser);
router.post("/users/logout", auth, logoutUser);
router.put("/users/profile", auth, updateUserProfile);
router.get("/users/profile", auth, getUserProfile);

module.exports = router;
