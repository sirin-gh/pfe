const Collecte = require("../models/collectemodel"); // Importez le modèle Collecte

// POST
exports.createCollecte = async (req, res) => {
  try {
    const collecte = new Collecte(req.body); // Utilisez le modèle Collecte pour créer une nouvelle instance
    await collecte.save(); // Enregistrez l'instance dans la base de données
    res.status(201).json(collecte); // Renvoyez la réponse avec l'instance créée
  } catch (error) {
    res.status(500).json({ error: "Could not create collecte." });
  }
};

// GET
exports.getAllCollectes = async (req, res) => {
  try {
    const collectes = await Collecte.find();
    res.status(200).json(collectes);
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve collectes." });
  }
};

// DELETE
exports.deleteCollecteById = async (req, res) => {
  const collecteId = req.params.id;
  try {
    await Collecte.findByIdAndDelete(collecteId);
    res.status(200).json({ message: "Collecte deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Could not delete collecte." });
  }
};

// PUT
exports.editCollecteById = async (req, res) => {
  const collecteId = req.params.id;
  const updatedCollecte = req.body;
  try {
    const collecte = await Collecte.findByIdAndUpdate(
      collecteId,
      updatedCollecte,
      { new: true }
    );
    res.status(200).json(collecte);
  } catch (error) {
    res.status(500).json({ error: "Could not update collecte." });
  }
};

// GET
exports.getCollecteById = async (req, res) => {
  const collecteId = req.params.id;
  try {
    const collecte = await Collecte.findById(collecteId);
    if (!collecte) {
      return res.status(404).json({ error: "Collecte not found." });
    }
    res.status(200).json(collecte);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
