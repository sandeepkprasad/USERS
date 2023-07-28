const jwt = require("jsonwebtoken");

const JWT = "success";

const fetchUser = (req, res, next) => {
  // Getting authtoken from the header.
  const token = req.header("authtoken");

  // Checking if token is valid or not.
  if (!token) {
    return res.status(401).send({ error: "Invalid token." });
  }

  try {
    // With token getting the user using jsonwebtoken.
    const data = jwt.verify(token, JWT);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(500).send("Internal server error.");
  }
};

module.exports = fetchUser;
