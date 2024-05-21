const Staff = require("../models/staffmodel");
const Admin = require("../models/adminmodel");
const Doctor = require("../models/docteurmodel");
const Donateur = require("../models/donateurmodel");
async function login(req, res) {
  const { email, password, userType } = req.body;

  try {
    let user;

    // Vérifier le type d'utilisateur et effectuer la recherche dans le modèle approprié
    if (userType === "staff") {
      user = await Staff.findOne({ Email: email, MotDePasse: password });
    } else if (userType === "admin") {
      user = await Admin.findOne({ Email: email, MotDePasse: password });
    } else if (userType === "docteur") {
      user = await Doctor.findOne({ Email: email, MotDePasse: password });
    } else if (userType === "donateur") {
      user = await Donateur.findOne({ Email: email, MotDePasse: password });
    }

    if (!user) {
      // Si l'utilisateur n'est pas trouvé, renvoyer une réponse d'erreur
      return res.status(401).json({ message: "Identifiants invalides" });
    }

    // L'utilisateur est authentifié avec succès
    // Vous pouvez générer un token d'authentification ici si vous utilisez l'authentification basée sur les tokens

    // Renvoyer une réponse réussie avec les détails de l'utilisateur authentifié
    res.status(200).json({ message: "Connexion réussie", user });
  } catch (error) {
    // En cas d'erreur lors de la recherche ou de la connexion
    console.error(error);
    res.status(500).json({ message: "Erreur de serveur" });
  }
}
module.exports = {
  login,
};
