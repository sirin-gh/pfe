const Admin = require("../models/adminmodel"); // Importez le modèle Donateur

// POST
exports.createAdmin = async (req, res) => {
  try {
    const donateur = new Admin(req.body); // Utilisez le modèle Donateur pour créer une nouvelle instance
    await donateur.save(); // Enregistrez l'instance dans la base de données
    res.status(201).json(donateur); // Renvoyez la réponse avec l'instance créée
  } catch (error) {
    // Si une erreur se produit, envoyez une réponse avec le statut 500 et incluez le message d'erreur complet
    res.status(500).json({
      error: "Could not create donateur",
      errorMessage: error.message,
    });
  }
};
