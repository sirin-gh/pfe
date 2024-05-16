const Reservation = require("../models/Réservationmodel"); // Importez le modèle Reservation

const Pusher = require("pusher");
const pusher = new Pusher({
  appId: "1600394",
  key: "e902c9ff9a8358cc8d41",
  secret: "8c2462747b53e7528019",
  cluster: "eu",
  useTLS: true,
});

exports.createReservation = async (req, res) => {
  try {
    const reservation = new Reservation(req.body); // Utilisez le modèle Reservation pour créer une nouvelle instance
    await reservation.save(); // Enregistrez l'instance dans la base de données

    // Envoyer une notification en temps réel avec Pusher
    pusher.trigger("reservation-channel", "new-reservation", reservation);

    res.status(201).json(reservation); // Renvoyez la réponse avec l'instance créée
  } catch (error) {
    // Si une erreur se produit, envoyez une réponse avec le statut 500 et incluez le message d'erreur complet
    res.status(500).json({
      error: "Could not create réservation",
      errorMessage: error.message,
    });
  }
};

// GET
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve reservations." });
  }
};

// DELETE
exports.deleteReservationById = async (req, res) => {
  const reservationId = req.params.id;
  try {
    await Reservation.findByIdAndDelete(reservationId);
    res.status(200).json({ message: "Reservation deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Could not delete reservation." });
  }
};

// PUT
exports.editReservationById = async (req, res) => {
  const reservationId = req.params.id;
  const updatedReservation = req.body;
  try {
    const reservation = await Reservation.findByIdAndUpdate(
      reservationId,
      updatedReservation,
      { new: true }
    );
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ error: "Could not update reservation." });
  }
};

// GET
exports.getReservationById = async (req, res) => {
  const reservationId = req.params.id;
  try {
    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found." });
    }
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getNombreReservations = async (req, res) => {
  try {
    const nombreReservations = await Reservation.countDocuments();
    res.status(200).json({ nombreReservations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
