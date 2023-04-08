const express = require("express");
const { config } = require("dotenv");
const connectDB = require("./assets/connectDB");
const { authUser, registerUser, getUserProfile } = require("./controllers");
const { errorCatcher, notFound } = require("./middlewares/errorHandlers");
const protect = require("./middlewares/protect");
const server = express();

config();
connectDB("User");

const port = process.env.USER_PORT || 4002;

server.use(express.json());

server.get("/auth/profile", protect, getUserProfile)
server.post("/auth/login", authUser);
server.post("/auth/register", registerUser);

server.use(notFound);

server.use(errorCatcher);

server.listen(port, () => {
    console.log(`User server running in ${process.env.NODE_ENV} on port: ${port}`);
});