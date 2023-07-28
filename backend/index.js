const express = require("express");
const connectToDB = require("./db");
const cors = require("cors");

// Connected to database.
connectToDB();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;

// Available routes.
app.use("/user", require("./routes/auth"));
app.use("/users", require("./routes/usersData"));

app.listen(PORT, () => {
  console.log("Users application is listening on port : " + PORT);
});
