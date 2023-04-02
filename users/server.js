require("dotenv").config();
const express = require("express");
const server = express();
const port = process.env.USER_PORT || 4002;
const User = require("./assets/models/User");
const connectDB = require("./assets/connectDB");

connectDB("User");

server.use(express.json());

server.get("/getdata", async (req, res) => {
    try {
        const users = await User.find({});

        res.json(users)
    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
});

server.listen(port, () => {
    console.log(`User server started running on port: ${port}`);
});