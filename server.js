"use strict";

require('dotenv').config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);

// Helper functions for querying the database:

// Seperated Routes for each Resource
// const api = require("./routes/api");

app.get('/', (req, res) => {
  res.send('ok');
})

app.listen(PORT, () => {
  console.log("Express app listening on port " + PORT);
});
