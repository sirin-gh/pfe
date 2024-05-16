const Rapport = require("../models/rapportmodel");

// Création d'un rapport
exports.createRapport = async (req, res, next) => {
  try {
    const rapport = new Rapport(req.body);
    await rapport.save();
    res.status(201).json(rapport);
  } catch (error) {
    res.status(500).json({
      error: "Could not create rapport",
      errorMessage: error.message,
    });
  }
};

// Lecture de tous les rapports
exports.getAllRapports = async (req, res) => {
  try {
    const rapports = await Rapport.find();
    res.status(200).json(rapports);
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve reports." });
  }
};

// Suppression d'un rapport par ID
exports.deleteRapportById = async (req, res) => {
  const rapportId = req.params.id;
  try {
    await Rapport.findByIdAndDelete(rapportId);
    res.status(200).json({ message: "Report deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Could not delete report." });
  }
};

// Mise à jour d'un rapport par ID
exports.editRapportById = async (req, res) => {
  const rapportId = req.params.id;
  const updatedRapport = req.body;
  try {
    const rapport = await Rapport.findByIdAndUpdate(rapportId, updatedRapport, {
      new: true,
    });
    res.status(200).json(rapport);
  } catch (error) {
    res.status(500).json({ error: "Could not update report." });
  }
};

// Lecture d'un rapport par ID
exports.getRapportById = async (req, res) => {
  const rapportId = req.params.id;
  try {
    const rapport = await Rapport.findById(rapportId);
    if (!rapport) {
      return res.status(404).json({ error: "Report not found." });
    }
    res.status(200).json(rapport);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
