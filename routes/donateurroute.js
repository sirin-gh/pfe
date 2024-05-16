const express = require("express");
const router = express.Router();
const donateurController = require("../controllers/donateurController");

// Admin CRUD routes
router.post("/create-donateur", donateurController.createDonateur);
router.get("/donateurs", donateurController.getAllDonateurs);
router.delete("/donateur/:id", donateurController.deleteDonateurById);
router.get("/donateur/:id", donateurController.getDonateurById);
router.put("/update/:id", donateurController.editDonateurById);
router.get("/nombreDonnateurs", donateurController.getNombreDonateurs);
module.exports = router;
