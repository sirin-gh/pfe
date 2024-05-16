const mongoose = require("mongoose");

const donateurSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  prénom: {
    type: String,
    required: true,
  },
  adresse: {
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
  MotDePasse: {
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
  Sexe: {
    type: String,
    required: true,
  },
});

const Donateur = mongoose.model("Donateur", donateurSchema);

module.exports = Donateur;
