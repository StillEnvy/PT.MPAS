const db = require("../config/db");
const turf = require("@turf/turf");

exports.saveLocation = (req, res) => {
  const { device_id, latitude, longitude } = req.body;

  db.query(
    "INSERT INTO locations (device_id, latitude, longitude) VALUES (?, ?, ?)",
    [device_id, latitude, longitude],
    (err) => {
      if (err) return res.status(500).json(err);

      // Check geofence
      db.query("SELECT * FROM geofences", (err, fences) => {
        if (err) return res.status(500).json(err);

        const point = turf.point([longitude, latitude]);

        let outside = false;

        fences.forEach((f) => {
          const poly = turf.polygon([JSON.parse(f.coordinates)]);
          const inside = turf.booleanPointInPolygon(point, poly);

          if (!inside) outside = true;
        });

        res.json({
          status: outside ? "Outside Geofence" : "Inside Geofence"
        });
      });
    }
  );
};