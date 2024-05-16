const express = require("express");
const router = express.Router();
const rapportController = require("../controllers/rapportController");

// Admin CRUD routes
router.post("/create-rapport", rapportController.createRapport);
router.get("/rapports", rapportController.getAllRapports);
router.delete("/rapport/:id", rapportController.deleteRapportById);
router.get("/rapport/:id", rapportController.getRapportById);
router.put("/update-rapport/:id", rapportController.editRapportById);
module.exports = router;
