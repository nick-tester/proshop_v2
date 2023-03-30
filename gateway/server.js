const gateway = require("fast-gateway");
const port = 5000;

const server = gateway({
    routes: [
        {
            prefix: "/users",
            target: "http://localhost:5001"
        },
        {
            prefix: "/products",
            target: "http://localhost:5002"
        }
    ]
});

server.get("/", (req, res) => {
    res.send("Inside gateway root route");
});

server
    .start(port)
    .then(() => {
        console.log(`Gateway server started running on port: ${port}`);
    });