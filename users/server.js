require("dotenv").config();
const express = require("express");
const server = express();
const port = process.env.USER_PORT || 4002;
const users = require("./users");

server.use(express.json());

server.get("/getdata", (req, res) => {
    res.json(users);
});

server.listen(port, () => {
    console.log(`User server started running on port: ${port}`);
});