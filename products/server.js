const express = require("express");
const server = express();
const port = 5002;

server.get("/getdata", (req, res) => {
    res.send("Inside products get data!");
});

server.listen(port, () => {
    console.log(`Products server started running on port: ${port}`);
});