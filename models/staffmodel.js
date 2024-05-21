const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
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
  position: {
    type: String,
    required: true,
  },
  StatutDemploi: {
    type: String,
    required: true,
  },
  Département: {
    type: String,
    required: true,
  },
  userType: {
    type: String,

    default: "staff", // Valeur par défaut : "admin"
  },
});

const Staff = mongoose.model("Staff", staffSchema);

module.exports = Staff;
