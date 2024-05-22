const express = require("express");
const db = require("./db"); // Importing the db.js file
const cors = require("cors");
const donateurroute = require("./routes/donateurroute");
const docteurrroute = require("./routes/docteurroutes");
const staffroute = require("./routes/staffroute");
const reservationroute = require("./routes/reservationRoute");
const sangroute = require("./routes/sangRoute");
const collecteroute = require("./routes/collecteRoute");
const rapportroute = require("./routes/rapportRoute");
const evenementroute = require("./routes/evenementRoute");
const messageroute = require("./routes/messagerieRoute");
const authroute = require("./routes/authRoute");
const adminroute = require("./routes/adminRoute");
const contactRoutes = require("./routes/contactRoute");
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// Middleware to parse JSON bodies
app.use(express.json());
app.use("/", donateurroute);
app.use("/", docteurrroute);
app.use("/", staffroute);
app.use("/", reservationroute);
app.use("/", sangroute);
app.use("/", collecteroute);
app.use("/", rapportroute);
app.use("/", evenementroute);
app.use("/", messageroute);
app.use("/", authroute);
app.use("/", adminroute);
app.use("/", contactRoutes);
// Define a route for the root URL '/'
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Create a new doctor document after MongoDB connection is established

// Start the server and listen on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
