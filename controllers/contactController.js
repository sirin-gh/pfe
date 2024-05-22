const nodemailer = require("nodemailer");

exports.contact = async (req, res) => {
  const { fullname, emailAddress, subject, message } = req.body;

  // Vérification que l'adresse email du destinataire est fournie dans le corps de la requête
  if (!emailAddress) {
    return res
      .status(400)
      .json({ error: "Adresse email du destinataire non fournie" });
  }

  // Configuration du transporteur de messagerie
  const transporter = nodemailer.createTransport({
    // Définissez ici les détails de votre service de messagerie
    service: "gmail",
    auth: {
      user: "hotelwallet123@gmail.com",
      pass: "xvwrbcognmodpmef",
    },
  });

  // Configuration du message
  const mailOptions = {
    from: "votre_email@gmail.com", // Remplacez par votre adresse email
    to: emailAddress,
    subject: subject,
    text: `Nom: ${fullname}\nEmail: ${emailAddress}\n\nMessage: ${message}`,
  };

  try {
    // Envoi de l'email
    await transporter.sendMail(mailOptions);
    console.log("Email envoyé avec succès");
    res.status(200).json({ message: "Email envoyé avec succès" });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
    res
      .status(500)
      .json({ error: "Une erreur est survenue lors de l'envoi de l'email" });
  }
};
