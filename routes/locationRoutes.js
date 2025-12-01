const express = require("express");
const router = express.Router();
const loc = require("../controllers/locationController");

router.post("/", loc.saveLocation);

module.exports = router;
