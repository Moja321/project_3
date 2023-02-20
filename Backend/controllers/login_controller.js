const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const login = require("../models/signup_schema.js");

router.post("/", (req, res) => {
  login.findOne({ username: req.body.username }, (error, foundUser) => {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        if (bcrypt.compareSync(req.body.password, foundUser.password)) {
          req.session.user = foundUser;
          res.redirect("/origami");
        } else {
          res.send("Invalid Username or Password");
        }
      }
    }
  });
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/origami");
  });
});

module.exports = router;
