const Donateur = require("../models/donateurmodel"); // Importez le modèle Donateur

// POST
exports.createDonateur = async (req, res) => {
  try {
    const donateur = new Donateur(req.body); // Utilisez le modèle Donateur pour créer une nouvelle instance
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

// GET
exports.getAllDonateurs = async (req, res) => {
  try {
    const donateurs = await Donateur.find();
    res.status(200).json(donateurs);
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve donateurs." });
  }
};
// DELETE
exports.deleteDonateurById = async (req, res) => {
  const donateurId = req.params.id;
  try {
    await Donateur.findByIdAndDelete(donateurId);
    res.status(200).json({ message: "Donateur deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Could not delete donateur." });
  }
};
// PUT
exports.editDonateurById = async (req, res) => {
  const donateurId = req.params.id;
  const updatedDonateur = req.body;
  try {
    const donateur = await Donateur.findByIdAndUpdate(
      donateurId,
      updatedDonateur,
      { new: true }
    );
    res.status(200).json(donateur);
  } catch (error) {
    res.status(500).json({ error: "Could not update donateur." });
  }
};
// GET
exports.getDonateurById = async (req, res) => {
  const donateurId = req.params.id;
  try {
    const donateur = await Donateur.findById(donateurId);
    if (!donateur) {
      return res.status(404).json({ error: "Donateur not found." });
    }
    res.status(200).json(donateur);
  } catch (error) {
    // Si une erreur se produit pendant la recherche du donateur
    // en utilisant findById, nous renvoyons une erreur 500 avec le message d'erreur.
    res.status(500).json({ error: error.message });
  }
};
// GET
exports.getNombreDonateurs = async (req, res) => {
  try {
    const nombreDonateurs = await Donateur.countDocuments();
    res.status(200).json({ nombreDonateurs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
