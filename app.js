//calling all the required packages
const express = require("express");
const cors = require('cors')
const bodyParser = require("body-parser");

const app = express();
app.use(cors())

// Configurations for "body-parser"
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

module.exports = app;