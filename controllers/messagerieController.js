const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "hotelwallet123@gmail.com",
    pass: "xvwrbcognmodpmef",
  },
});

exports.createMessage = async (req, res) => {
  const { subject, text } = req.body; // Récupérer les données de la requête

  // Définir les options de l'e-mail en utilisant les données de la requête
  const mailOptions = {
    from: "hotelwallet123@gmail.com",
    to: "tamersakly@gmail.com",
    subject: "message  donation équipe",
    text,
  };

  // Envoyer l'e-mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Erreur lors de l'envoi de l'e-mail:", error);
      res.status(500).json({ error: "Erreur lors de l'envoi de l'e-mail" });
    } else {
      console.log("E-mail envoyé:", info.response);
      res.status(200).json({ message: "E-mail envoyé avec succès" });
    }
  });
};
