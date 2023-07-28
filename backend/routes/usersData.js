const express = require("express");
const router = express.Router();
const UsersData = require("../models/UsersData");
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");

// GET 1: Get all users using GET "/users/allusers". Login Required
router.get("/allusers", fetchUser, async (req, res) => {
  try {
    const users = await UsersData.find({ user: req.user.id });
    res.json(users);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

// POST 2: Adding new user using POST "/users/adduser". Login Required
router.post(
  "/adduser",
  fetchUser,
  [
    body("name", "Enter a valid name.").isLength({ min: 3 }),
    body("number", "Number must be atleast 10 digits.").isLength({ min: 10 }),
    body("email", "Enter a valid email.").isEmail(),
  ],
  async (req, res) => {
    const { name, number, email } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Creating the user data.
    try {
      const user = new UsersData({
        name,
        number,
        email,
        user: req.user.id,
      });
      const saveUser = await user.save();
      res.json(saveUser);
    } catch (error) {
      res.status(500).send("Internal server error.");
    }
  }
);

// PUT 3: Update a note using POST "/users/updateuser". Login Required
router.put("/updateuser/:id", fetchUser, async (req, res) => {
  const { name, number, email } = req.body;

  const newUser = {};
  if (name) {
    newUser.name = name;
  }
  if (number) {
    newUser.number = number;
  }
  if (email) {
    newUser.email = email;
  }

  // Getting userData by user id from params
  let user = await UsersData.findById(req.params.id);
  if (!user) {
    return res.status(404).send("Not found.");
  }

  // Checking ifr other one accessing user userdata.
  if (user.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }

  // Finding the user & updating the newUserdata.
  user = await UsersData.findByIdAndUpdate(
    req.params.id,
    { $set: newUser },
    { new: true }
  );

  res.json(user);
});

// DELETE 4: Deleting a userData using DELETE "/users/deleteuser/". Login Required
router.delete("/deleteuser/:id", fetchUser, async (req, res) => {
  try {
    let user = await UsersData.findById(req.params.id);
    if (!user) {
      return res.status(404).send("Not found");
    }

    user = await UsersData.findByIdAndDelete(req.params.id);
    res.json({ Success: "User has been deleted." });
  } catch (error) {
    res.status(500).send("Internal server error.");
  }
});

module.exports = router;
