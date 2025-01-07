const mongoose = require("mongoose");

const con_string = "mongodb+srv://apoorvavarshney23cse:0QVCiw3oIE9UecFE@cluster0.e0uvy.mongodb.net/ProductsDB?retryWrites=true&w=majority";

const dbconnect = async () => {
    try {
        // Connecting to MongoDB with the updated options
        await mongoose.connect(con_string);
        console.log("Database is connected");
    } catch (err) {
        console.error("Database connection error:", err);
    }
};

module.exports = dbconnect;
