const express = require("express");
const { config } = require("dotenv");
const connectDB = require("./assets/connectDB");
const { getUsers, getUserByID, authUser, registerUser } = require("./controllers");
const { errorCatcher, notFound } = require("./middlewares/errorHandlers");
const server = express();

config();
connectDB("User");

const port = process.env.USER_PORT || 4002;

server.use(express.json());

server.get("/all", getUsers);
server.get("/single/:id", getUserByID);
server.post("/auth/login", authUser);
server.post("/auth/register", registerUser);

server.use(notFound);

server.use(errorCatcher);

server.listen(port, () => {
    console.log(`User server running in ${process.env.NODE_ENV} on port: ${port}`);
});