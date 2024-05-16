const mongoose = require("mongoose");

const SangSchema = new mongoose.Schema({
  GroupeSanguin: {
    type: String,
    required: true,
  },
  Rhésus: {
    type: String,
    required: true,
  },
  QuantitéDisponible: {
    type: Number,
    required: true,
  },

  DateDecollecte: {
    type: Date,
    required: true,
  },
  NuméroDeLot: {
    type: String,
    required: true,
  },
  récepteur: {
    type: String,
    required: true,
  },

  Donneur: {
    type: String,
    required: true,
  },
});

const sang = mongoose.model("sang", SangSchema);

module.exports = sang;
