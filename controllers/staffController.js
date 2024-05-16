const Staff = require("../models/staffmodel"); // Importez le modèle Staff

// POST
exports.createStaff = async (req, res) => {
  try {
    const staff = new Staff(req.body); // Utilisez le modèle Staff pour créer une nouvelle instance
    await staff.save(); // Enregistrez l'instance dans la base de données
    res.status(201).json(staff); // Renvoyez la réponse avec l'instance créée
  } catch (error) {
    // Si une erreur se produit, envoyez une réponse avec le statut 500 et incluez le message d'erreur complet
    res.status(500).json({
      error: "Could not create staff",
      errorMessage: error.message,
    });
  }
};

// GET
exports.getAllStaff = async (req, res) => {
  try {
    const staffList = await Staff.find();
    res.status(200).json(staffList);
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve staff." });
  }
};

// DELETE
exports.deleteStaffById = async (req, res) => {
  const staffId = req.params.id;
  try {
    await Staff.findByIdAndDelete(staffId);
    res.status(200).json({ message: "Staff deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Could not delete staff." });
  }
};

// PUT
exports.editStaffById = async (req, res) => {
  const staffId = req.params.id;
  const updatedStaff = req.body;
  try {
    const staff = await Staff.findByIdAndUpdate(staffId, updatedStaff, {
      new: true,
    });
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ error: "Could not update staff." });
  }
};

// GET
exports.getStaffById = async (req, res) => {
  const staffId = req.params.id;
  try {
    const staff = await Staff.findById(staffId);
    if (!staff) {
      return res.status(404).json({ error: "Staff not found." });
    }
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
