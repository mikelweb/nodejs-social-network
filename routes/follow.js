const express = require("express");
const router = express.Router();
const FollowController = require("../controller/Follow")

router.get("/prueba-follow", FollowController.pruebaFollow);

module.exports = router;