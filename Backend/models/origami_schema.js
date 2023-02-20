const mongoose = require("mongoose");

const origamiSchema = new mongoose.Schema({
  name: { type: String, required: true },
  img: { type: String },
  description: { type: String },
});

const origami = mongoose.model("origami", origamiSchema);
module.exports = origami;
