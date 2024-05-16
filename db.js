const mongoose = require("mongoose");

// URL de connexion à MongoDB
const mongoDBUrl =
  "mongodb+srv://abdessamadaya1:ayaabdess123@cluster2.owc7txo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2";

// Connexion à MongoDB
mongoose.connect(mongoDBUrl);

// Obtenir l'objet de connexion
const db = mongoose.connection;

// Gestion des événements liés à la connexion
db.on("error", console.error.bind(console, "Erreur de connexion à MongoDB :"));
db.once("open", function () {
  console.log("Connexion à MongoDB réussie.");
});

module.exports = db;
