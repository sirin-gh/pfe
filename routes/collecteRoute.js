const express = require("express");
const router = express.Router();
const collecteController = require("../controllers/collecteController");

// Admin CRUD routes
router.post("/create-collecte", collecteController.createCollecte);
router.get("/collectes", collecteController.getAllCollectes);
router.delete("/collecte/:id", collecteController.deleteCollecteById);
router.get("/collecte/:id", collecteController.getCollecteById);
router.put("/update-collecte/:id", collecteController.editCollecteById);
module.exports = router;
