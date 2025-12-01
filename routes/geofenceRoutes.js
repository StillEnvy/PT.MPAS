const express = require("express");
const router = express.Router();
const geo = require("../controllers/geofenceController");

router.get("/", geo.getAllGeofences);
router.post("/", geo.createGeofence);

module.exports = router;
