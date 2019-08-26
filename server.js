const express = require("express");

const server = express();

const postRouter = require("./posts/index");

server.use(express.json());

server.use("/api/posts", postRouter);

module.exports = server;
