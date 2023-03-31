require("dotenv").config();
const gateway = require("fast-gateway");
const port = process.env.GATEWAY_PORT || 4000;

const server = gateway({
    routes: [
        {
            prefix: "/products",
            target: "http://localhost:5001"
        },
        {
            prefix: "/users",
            target: "http://localhost:5002"
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