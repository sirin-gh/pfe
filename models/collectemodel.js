const mongoose = require("mongoose");

const collecteSchema = new mongoose.Schema({
  Nom: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  lieu: {
    type: String,
    required: true,
  },
  objectif: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Collecte = mongoose.model("Collecte", collecteSchema);

module.exports = Collecte;
