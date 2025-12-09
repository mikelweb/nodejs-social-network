const express = require("express");
const router = express.Router();
const UserController = require("../controller/User")
const auth = require("../middleware/auth")

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/profile/:nick", auth.auth, UserController.profile);

module.exports = router;