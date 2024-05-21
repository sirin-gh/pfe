const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  nom: {
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
  userType: {
    type: String,

    default: "admin", // Valeur par défaut : "admin"
  },
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
