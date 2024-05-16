const express = require("express");
const router = express.Router();
const docteurController = require("../controllers/docteurController");

// Admin CRUD routes
router.post("/create-docteur", docteurController.createDoctor);
router.get("/docteurs", docteurController.getAllDoctors);
router.delete("/docteur/:id", docteurController.deleteDoctorById);
router.get("/docteur/:id", docteurController.getDoctorById);
router.put("/update-docteur/:id", docteurController.editDoctorById);
module.exports = router;
