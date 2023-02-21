const express = require("express");
const router = express.Router();
const multer = require("multer");

const origami = require("../models/origami_schema.js");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  try {
    res.json(await origami.find({}));
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/", upload.single("myImage"), async (req, res) => {
  try {
    res.json(await origami.create(req.body));
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    res.json(
      await origami.findByIdAndUpdate(req.params.id, req.body, { new: true })
    );
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    res.json(await origami.findByIdAndRemove(req.params.id));
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
