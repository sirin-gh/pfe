const mongoose = require("mongoose");

const rapportSchema = new mongoose.Schema({
  nomPrenom: {
    type: String,
    required: true,
  },

  GroupeSanguin: {
    type: String,
    required: true,
  },
  Rhésus: {
    type: String,
    required: true,
  },
  dateHeure: {
    type: Date,
    required: true,
  },
  emplacement: {
    type: String,
    required: true,
  },
  titre: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  Sexe: {
    type: String,
    required: true,
  },
  idDonneur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Donateur",
    required: true,
  },
});

const Rapport = mongoose.model("Rapport", rapportSchema);

module.exports = Rapport;
