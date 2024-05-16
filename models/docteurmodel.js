const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  prénom: {
    type: String,
    required: true
  }, 
  adresse: {
    type: String,
    required: true
  }, 
  dateDeNaissance: {
    type: Date,
    required: true
  },
  numéroDeTéléphone: {
    type: String,
    required: true
  },
  MotDePasse: {
    type: String,
    required: true
  }, 
  Email: {
    type: String,
    required: true
  }, 
  specialité: {
    type: String,
    required: true
  }
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
