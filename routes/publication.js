const express = require("express");
const router = express.Router();
const PublicationController = require("../controller/Publication")

router.get("/prueba-publication", PublicationController.pruebaPub);

module.exports = router;