const mongoose = require("mongoose");

const rapportSchema = new mongoose.Schema({
  nomPrenom: {
    type: String,
    required: true,
  },
  Email: {
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
  Adresse: {
    type: String,
    required: true,
  },
  dateDeNaissance: {
    type: Date,
    required: true,
  },
  numéroDeTéléphone: {
    type: String,
    required: true,
  },
  Sexe: {
    type: String,
    required: true,
  },
  confirmation: {
    type: Boolean,
    default: false,
  },
  organisateur: {
    type: String,
    required: true,
  },
  QuantitéDisponible: {
    type: Number,
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
