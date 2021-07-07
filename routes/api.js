"use strict";
const translateController = require("../controllers/translate-controller");
const router = require("express").Router();

router.post("/translate", translateController.translateString);

module.exports = router;
