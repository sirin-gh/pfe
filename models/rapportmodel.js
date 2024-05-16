const mongoose = require("mongoose");

const rapportSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Rapport = mongoose.model("Rapport", rapportSchema);

module.exports = Rapport;
