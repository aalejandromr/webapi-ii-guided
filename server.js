const express = require("express");

const HubsRouter = require("./hubs/hubs-router");

const server = express();

server.use(express.json()); // middleware

server.use("/api/hubs", HubsRouter); // base url and hook the router

server.get("/", (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h>
    <p>Welcome to the Lambda Hubs API</p>
  `);
});

// this is how you export so the others can use it
module.exports = server;
