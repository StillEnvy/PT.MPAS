const db = require("../config/db");

exports.getAllGeofences = (req, res) => {
  db.query("SELECT * FROM geofences", (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
};

exports.createGeofence = (req, res) => {
  const { name, coordinates } = req.body;

  db.query(
    "INSERT INTO geofences (name, coordinates) VALUES (?, ?)",
    [name, JSON.stringify(coordinates)],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId, message: "Geofence saved" });
    }
  );
};
