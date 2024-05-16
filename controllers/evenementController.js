const Evenement = require("../models/Evenementmodel");

// Création d'un événement
exports.createEvenement = async (req, res) => {
  try {
    const evenement = new Evenement(req.body);
    await evenement.save();
    res.status(201).json(evenement);
  } catch (error) {
    res.status(500).json({
      error: "Could not create event",
      errorMessage: error.message,
    });
  }
};

// Lecture de tous les événements
exports.getAllEvenements = async (req, res) => {
  try {
    const evenements = await Evenement.find();
    res.status(200).json(evenements);
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve events." });
  }
};

// Suppression d'un événement par ID
exports.deleteEvenementById = async (req, res) => {
  const evenementId = req.params.id;
  try {
    await Evenement.findByIdAndDelete(evenementId);
    res.status(200).json({ message: "Event deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Could not delete event." });
  }
};

// Mise à jour d'un événement par ID
exports.editEvenementById = async (req, res) => {
  const evenementId = req.params.id;
  const updatedEvenement = req.body;
  try {
    const evenement = await Evenement.findByIdAndUpdate(
      evenementId,
      updatedEvenement,
      { new: true }
    );
    res.status(200).json(evenement);
  } catch (error) {
    res.status(500).json({ error: "Could not update event." });
  }
};

// Lecture d'un événement par ID
exports.getEvenementById = async (req, res) => {
  const evenementId = req.params.id;
  try {
    const evenement = await Evenement.findById(evenementId);
    if (!evenement) {
      return res.status(404).json({ error: "Event not found." });
    }
    res.status(200).json(evenement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getNombreEvenements = async (req, res) => {
  try {
    const nombreEvenements = await Evenement.countDocuments();
    res.status(200).json({ nombreEvenements });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
