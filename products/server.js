require("dotenv").config();
const express = require("express");
const server = express();
const port = process.env.PRODUCT_PORT || 4001;

server.get("/getdata", (req, res) => {
    res.send("Inside products get data!");
});

server.listen(port, () => {
    console.log(`Product server started running on port: ${port}`);
});