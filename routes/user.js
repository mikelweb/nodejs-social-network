const express = require("express");
const router = express.Router();
const UserController = require("../controller/User")

router.get("/prueba-user", UserController.pruebaUser);

module.exports = router;