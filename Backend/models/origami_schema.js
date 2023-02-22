const mongoose = require("mongoose");

const origamiSchema = new mongoose.Schema({
  posterid: { type: String },
  name: { type: String },
  likes: { type: Number },
  title: { type: String, required: true },
  img: { type: String },
  description: { type: String },
  reference: { type: String },
  instructions: { type: String },
});

const origami = mongoose.model("origami", origamiSchema);
module.exports = origami;
