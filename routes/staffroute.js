const express = require("express");
const router = express.Router();
const staffController = require("../controllers/staffController");

// Admin CRUD routes
router.post("/create-staff", staffController.createStaff);
router.get("/staff", staffController.getAllStaff);
router.delete("/staff/:id", staffController.deleteStaffById);
router.get("/staff/:id", staffController.getStaffById);
router.put("/update-staff/:id", staffController.editStaffById);
module.exports = router;
