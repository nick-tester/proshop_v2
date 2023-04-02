require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async (dbHost) => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            dbName: "proshop23"
        });

        console.log(`${dbHost} database connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
