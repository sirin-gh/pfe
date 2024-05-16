const express = require("express");
const router = express.Router();
const sangController = require("../controllers/sangController");

// Admin CRUD routes
router.post("/create-sang", sangController.createDonDeSang);
router.get("/sangs", sangController.getAllDonsDeSang);
router.delete("/sang/:id", sangController.deleteDonDeSangById);
router.get("/sang/:id", sangController.getDonDeSangById);
router.put("/update-sang/:id", sangController.editDonDeSangById);
router.get("/quantitysang", sangController.getTotalQuantiteDisponible);
// GET /sang/pourcentage-quantite
router.get(
  "/pourcentage-quantite",
  sangController.getPourcentageQuantiteSangParGroupe
);
router.get("/test-quantite-sang", sangController.testQuantiteSang);
module.exports = router;
