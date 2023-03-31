require("dotenv").config();
const express = require("express");
const server = express();
const port = process.env.USER_PORT || 4002;

server.get("/getdata", (req, res) => {
    res.send("Inside users get data!");
});

server.listen(port, () => {
    console.log(`User server started running on port: ${port}`);
});