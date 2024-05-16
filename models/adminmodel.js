const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
 
  MotDePasse: {
    type: String,
    required: true
  }, 
  Email: {
    type: Email,
    required: true
  }, 
 
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
