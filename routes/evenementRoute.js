const express = require("express");
const router = express.Router();
const evenementController = require("../controllers/evenementController");

router.post("/create-evenement", evenementController.createEvenement);
router.get("/evenements", evenementController.getAllEvenements);
router.delete("/evenement/:id", evenementController.deleteEvenementById);
router.get("/evenement/:id", evenementController.getEvenementById);
router.put("/update-evenement/:id", evenementController.editEvenementById);
router.get("/nombreEvenements", evenementController.getNombreEvenements);
module.exports = router;
