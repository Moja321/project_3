const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const login = require("../models/signup_schema.js");

router.post("/", (req, res) => {
  login.findOne({ username: req.body.username }, (err, foundUser) => {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        if (bcrypt.compareSync(req.body.password, foundUser.password)) {
          req.session.user = foundUser;
          console.log(foundUser);
          res.send(foundUser);
          //res.redirect("/origami");
        } else {
          res.send("FAIL"); //check status on react
        }
      }
    }
  });
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    //res.redirect("/origami");
  });
});

module.exports = router;
