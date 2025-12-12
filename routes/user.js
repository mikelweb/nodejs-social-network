const express = require("express");
const router = express.Router();
const UserController = require("../controller/User")
const auth = require("../middleware/auth")

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/profile/:nick", auth.auth, UserController.profile);
// Two possible cases, with or without param
router.get("/list", auth.auth, UserController.list);
router.get("/list/:page", auth.auth, UserController.list);

module.exports = router;