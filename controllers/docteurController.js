const Doctor = require("../models/docteurmodel"); // Importez le modèle Doctor

// POST
exports.createDoctor = async (req, res) => {
  try {
    const doctor = new Doctor(req.body); // Utilisez le modèle Doctor pour créer une nouvelle instance
    await doctor.save(); // Enregistrez l'instance dans la base de données
    res.status(201).json(doctor); // Renvoyez la réponse avec l'instance créée
  } catch (error) {
    // Si une erreur se produit, envoyez une réponse avec le statut 500 et incluez le message d'erreur complet
    res.status(500).json({
      error: "Could not create doctor",
      errorMessage: error.message,
    });
  }
};

// GET
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve doctors." });
  }
};

// DELETE
exports.deleteDoctorById = async (req, res) => {
  const doctorId = req.params.id;
  try {
    await Doctor.findByIdAndDelete(doctorId);
    res.status(200).json({ message: "Doctor deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Could not delete doctor." });
  }
};

// PUT
exports.editDoctorById = async (req, res) => {
  const doctorId = req.params.id;
  const updatedDoctor = req.body;
  try {
    const doctor = await Doctor.findByIdAndUpdate(doctorId, updatedDoctor, {
      new: true,
    });
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ error: "Could not update doctor." });
  }
};

// GET
exports.getDoctorById = async (req, res) => {
  const doctorId = req.params.id;
  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found." });
    }
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
