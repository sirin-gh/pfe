const mongoose = require("mongoose");

const evenementSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Evenement = mongoose.model("Evenement", evenementSchema);

module.exports = Evenement;
