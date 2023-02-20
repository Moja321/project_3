const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const signup = require("../models/signup_schema.js");

router.post("/", (req, res) => {
  const randomSaltSync = Math.floor(Math.random() * 10) + 1;
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(randomSaltSync)
  );
  signup.create(req.body, (err, createdUser) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully created user " + createdUser.username);
      req.session.user = createdUser;
      res.redirect("/origami");
    }
  });
});

module.exports = router;
