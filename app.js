const express = require("express");
const morgan = require("morgan");
const userRoutes = require("./Routes/userRoutes");

const app = express();

app.use(morgan("dev"));

// Body parser, reading data from body into req.body
app.use(express.json());

// ROUTES
app.use("/api/v1/users", userRoutes);

module.exports = app;
