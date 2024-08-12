// Import packages
require("dotenv").config();
const express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

const betBull = require("./routes/betBull");
const betBear = require("./routes/betBear");

// Middlewares
const app = express();
app.use(express.json());

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use("/betBull", betBull);
app.use("/betBear", betBear);

//fetch the rewards & show in the button to claim

// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));
