const { randomBytes } = require("crypto");

const users = [
    {
        name: "Admin User",
        email: "admin@example.com",
        password: "123456",
        isAdmin: true
    },
    {
        name: "John Doe",
        email: "jdoe@example.com",
        password: "123456"
    },
    {
        name: "Jane Smith",
        email: "jsmith@example.com",
        password: "123456"
    }
];

const newUsers = users.map((user) => {
    return { _id: randomBytes(10).toString("hex"), ...user }
});

module.exports = newUsers;