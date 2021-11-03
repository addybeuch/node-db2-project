const express = require("express");

const carRouter = require("./cars/cars-router");

const server = express();

server.use(express.json());

server.use("/api/cars", carRouter);

server.use("*", (req, res) => {
  res.status(404).json({
    message: "it didnt work man!",
  });
});

module.exports = server;
