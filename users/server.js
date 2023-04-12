const express = require("express");
const { config } = require("dotenv");
const connectDB = require("./assets/connectDB");
const { authUser, registerUser, getUserProfile, updateUserProfile } = require("./controllers");
const { errorCatcher, notFound } = require("./middlewares/errorHandlers");
const protect = require("./middlewares/protect");
const server = express();

config();
connectDB("User");

server.use(express.json());

server
    .route("/auth/profile")
    .post(registerUser)
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)

server.post("/auth", authUser);

server.use(notFound);
server.use(errorCatcher);

const port = process.env.USER_PORT || 4002;
server.listen(port, () => console.log(`User server running in ${process.env.NODE_ENV} on port: ${port}`));