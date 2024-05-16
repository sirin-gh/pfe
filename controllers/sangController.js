const Sang = require("../models/sangmodel"); // Importez le modèle Sang

const Pusher = require("pusher");
// POST
exports.createDonDeSang = async (req, res) => {
  try {
    const donDeSang = new Sang(req.body); // Utilisez le modèle Sang pour créer une nouvelle instance
    await donDeSang.save(); // Enregistrez l'instance dans la base de données
    res.status(201).json(donDeSang); // Renvoyez la réponse avec l'instance créée
  } catch (error) {
    // Si une erreur se produit, envoyez une réponse avec le statut 500 et incluez le message d'erreur complet
    res.status(500).json({
      error: "Could not create sang",
      errorMessage: error.message,
    });
  }
};

// GET
exports.getAllDonsDeSang = async (req, res) => {
  try {
    const donsDeSang = await Sang.find();
    res.status(200).json(donsDeSang);
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve blood donations." });
  }
};

// DELETE
exports.deleteDonDeSangById = async (req, res) => {
  const donDeSangId = req.params.id;
  try {
    await Sang.findByIdAndDelete(donDeSangId);
    res.status(200).json({ message: "Blood donation deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Could not delete blood donation." });
  }
};

// PUT
exports.editDonDeSangById = async (req, res) => {
  const donDeSangId = req.params.id;
  const updatedDonDeSang = req.body;
  try {
    const donDeSang = await Sang.findByIdAndUpdate(
      donDeSangId,
      updatedDonDeSang,
      { new: true }
    );
    res.status(200).json(donDeSang);
  } catch (error) {
    res.status(500).json({ error: "Could not update blood donation." });
  }
};

// GET
exports.getDonDeSangById = async (req, res) => {
  const donDeSangId = req.params.id;
  try {
    const donDeSang = await Sang.findById(donDeSangId);
    if (!donDeSang) {
      return res.status(404).json({ error: "Blood donation not found." });
    }
    res.status(200).json(donDeSang);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// GET
exports.getTotalQuantiteDisponible = async (req, res) => {
  try {
    const donsDeSang = await Sang.find();
    let totalQuantiteDisponible = 0;
    donsDeSang.forEach((don) => {
      totalQuantiteDisponible += don.QuantitéDisponible;
    });
    res.status(200).json({ totalQuantiteDisponible });
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve total quantity." });
  }
};
exports.getPourcentageQuantiteSangParGroupe = async (req, res) => {
  try {
    // Obtenir la quantité totale de sang disponible
    const totalQuantiteSang = await Sang.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$QuantitéDisponible" },
        },
      },
    ]);

    if (totalQuantiteSang.length === 0) {
      // Aucun document trouvé, renvoyer une réponse vide
      return res.status(200).json([]);
    }

    const totalQuantite = totalQuantiteSang[0].total;

    // Calculer le pourcentage pour chaque groupe sanguin
    const pipeline = [
      {
        $group: {
          _id: "$GroupeSanguin",
          totalQuantite: { $sum: "$QuantitéDisponible" },
        },
      },
      {
        $project: {
          _id: 0,
          GroupeSanguin: "$_id",
          Pourcentage: {
            $multiply: [{ $divide: ["$totalQuantite", totalQuantite] }, 100],
          },
        },
      },
    ];

    const pourcentageQuantiteSang = await Sang.aggregate(pipeline);
    res.status(200).json(pourcentageQuantiteSang);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Initialisez Pusher
const pusher = new Pusher({
  appId: "1600394",
  key: "e902c9ff9a8358cc8d41",
  secret: "8c2462747b53e7528019",
  cluster: "eu",
  useTLS: true,
});

exports.testQuantiteSang = async (req, res) => {
  try {
    // Récupérer la quantité de sang pour chaque groupe sanguin
    const groupesSanguins = await Sang.find(
      {},
      "GroupeSanguin QuantitéDisponible"
    );

    // Vérifier si la quantité est inférieure à 10 litres pour chaque groupe sanguin
    groupesSanguins.forEach(async (groupe) => {
      if (groupe.QuantitéDisponible < 10) {
        // Envoyer une notification en temps réel avec Pusher
        const notificationData = {
          quantite: groupe.QuantitéDisponible,
          groupeSanguin: groupe.GroupeSanguin,
          message: `Alerte ! La quantité de sang pour le groupe sanguin ${groupe.GroupeSanguin} est inférieure à 10 litres.`,
        };
        await sendNotification(notificationData);
      }
    });

    res.status(200).json({ message: "Test de la quantité de sang terminé" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors du test de la quantité de sang" });
  }
};

async function sendNotification(data) {
  try {
    await pusher.trigger("sang-channel", "low-sang-alert", data);
  } catch (error) {
    console.error("Erreur lors de l'envoi de la notification Pusher :", error);
    throw error;
  }
}
