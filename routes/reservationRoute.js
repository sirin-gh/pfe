const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");

// Admin CRUD routes
router.post("/create-reservation", reservationController.createReservation);
router.get("/reservations", reservationController.getAllReservations);
router.delete("/reservation/:id", reservationController.deleteReservationById);
router.get("/reservation/:id", reservationController.getReservationById);
router.put(
  "/update-reservation/:id",
  reservationController.editReservationById
);
router.get("/nombreReservations", reservationController.getNombreReservations);
module.exports = router;
