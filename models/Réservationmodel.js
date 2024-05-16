const mongoose = require("mongoose");
const RéservationSchema = new mongoose.Schema({
  nomPrenom: {
    type: String,
    required: true,
  },
  dateHeure: {
    type: Date,
    required: true,
  },
  groupeSanguin: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], // Assuming ABO blood group system
    required: true,
  },
  emplacement: {
    type: String,
    required: true,
  },
  confirmation: {
    type: Boolean,
    default: false,
  },
  donneur: {
    type: String,
    required: true,
  },
  /*donneur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Donateur",
  },*/
});

const Réservation = mongoose.model("Réservation", RéservationSchema);

module.exports = Réservation;
