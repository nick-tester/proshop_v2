const express = require("express");
const { config } = require("dotenv");
const { json } = require("express");
const server = express();
const connectDB = require("./assets/connectDB");
const { getUsers, getUserByID } = require("./controllers");
const { errorCatcher, notFound } = require("./middlewares/errorHandlers");

config();
connectDB("User");
json();

const port = process.env.USER_PORT || 4002;

server.get("/all", getUsers);
server.get("/single/:id", getUserByID);

server.use(notFound);

server.use(errorCatcher);

server.listen(port, () => {
    console.log(`User server running in ${process.env.NODE_ENV} on port: ${port}`);
});