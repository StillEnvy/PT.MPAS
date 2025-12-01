const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

app.use(bodyParser.json());
app.use(express.static("public"));

// set EJS as view engine
app.set("view engine", "ejs");

// tell Express where the views folder is
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/api/geofences", require("./routes/geofenceRoutes"));
app.use("/api/location", require("./routes/locationRoutes"));

app.get("/", (req, res) => {
  res.render("index"); // dashboard.ejs inside /views
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
