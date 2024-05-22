const express = require("express");
const router = express.Router();
const contactcontroller = require("../controllers/contactController");
router.post("/contact", contactcontroller.contact);
module.exports = router;
