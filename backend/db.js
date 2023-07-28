const mongoose = require("mongoose");

// Creating URI here.
const URI = "mongodb://localhost:27017/UserStore";

// Connecting to database using URI and Mongoose.
const connectToDB = () => {
  mongoose.connect(URI);
};

module.exports = connectToDB;
