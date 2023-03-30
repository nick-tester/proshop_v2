const express = require("express");
const server = express();
const port = 5001;

server.get("/getdata", (req, res) => {
    res.send("Inside users get data!");
});

server.listen(port, () => {
    console.log(`User server started running on port: ${port}`);
});