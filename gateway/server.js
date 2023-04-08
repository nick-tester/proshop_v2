require("dotenv").config();
const gateway = require("fast-gateway");
const port = process.env.GATEWAY_PORT || 4000;

const server = gateway({
    routes: [
        {
            prefix: "/api/v1/products",
            target: process.env.TARGET_URL1
        },
        {
            prefix: "/api/v1/users",
            target: process.env.TARGET_URL2
        }
    ]
});

server.get("/", (req, res) => {
    res.send("Inside gateway root route");
});

server.get("/users", (req, res) => {
    res.send("Inside user root route");
});

server.get("/products", (req, res) => {
    res.send("Inside product root route");
});

server
    .start(port)
    .then(() => {
        console.log(`Gateway server started running on port: ${port}`);
    });