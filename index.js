const { conn } = require("./database/conn");
const express = require("express");
const cors = require("cors");

// DB connection
conn();

// Node server
const app = express();
// Server port
const port = 3900;

// Configure CORS
app.use(cors());

// Convert body to JS Obj
app.use(express.json());
// Get x-www-urlencoded
app.use(express.urlencoded({extended: true}));

// Social network routes
const userRoutes = require("./routes/user");
const publicationRoutes = require("./routes/publication");
const followRoutes = require("./routes/follow");

app.use("/api", userRoutes);
app.use("/api", publicationRoutes);
app.use("/api", followRoutes);

// Run server and listen on port 3900
app.listen(port, () => {
    console.log("Server running on port " + port)
});