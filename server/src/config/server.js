const express = require("express");
const env = require("dotenv");
env.config();
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require('body-parser');

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(helmet());
server.use(cors());

const authMiddleware = require("../middlewares/AuthMiddleware");
authMiddleware(server);
const authRoutes = require("../routes/AuthRoutes");
server.use("/api/auth", authRoutes);

const userRoutes = require("../routes/UserRoutes");
server.use("/api/users", userRoutes);

const carRoutes = require("../routes/CarRoutes");
server.use("/api/cars", carRoutes);

// TODO: errorhandler middleware with predefined errors

module.exports = server;
