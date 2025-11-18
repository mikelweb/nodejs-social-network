const { conn } = require("./database/conn");
const express = require("express");

// Node server
const app = express();
// Server port
const port = 3900;

// Convert body to JS Obj
app.use(express.json());
// Get x-www-urlencoded
app.use(express.urlencoded({extended: true}));
app.listen(port, () => {
    console.log("Server running on port " + port)
});