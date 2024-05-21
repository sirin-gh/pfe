const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// Admin CRUD routes
router.post("/create-admin", adminController.createAdmin);

module.exports = router;
