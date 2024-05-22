import "./Contact.css"
import { useState } from "react"
import axios from "axios"
function Contact() {
  const [successMessage, setSuccessMessage] = useState("")
  const [formData, setFormData] = useState({
    fullname: "",
    emailAddress: "",
    subject: "",
    message: "",
  })

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      await axios.post("http://localhost:5000/contact", formData)
      alert("Email envoyé avec succès")
      // Réinitialiser le formulaire après l'envoi réussi
      setFormData({
        fullname: "",
        emailAddress: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email :", error)
      alert("Une erreur est survenue lors de l'envoi de l'email")
    }
  }
  return (
    <div id="contact">
      <div className="ContactPage container-fluid">
        <h1 className="titleC">Contact us </h1>
        <div className="contactcontainer">
          <div className="col-md-6">
            {successMessage && (
              <div className="success-box">
                <p className="success-message">{successMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <label htmlFor="name">fullname :</label>
              <input
                type="text"
                name="fullname"
                className="form-control"
                placeholder="Full Name"
                value={formData.fullname}
                onChange={handleChange}
                required
              />

              <label htmlFor="email">Email :</label>
              <input
                type="email"
                name="emailAddress"
                className="form-control"
                placeholder="Email adress"
                value={formData.emailAddress}
                onChange={handleChange}
                required
              />

              <label htmlFor="message">subject :</label>
              <textarea
                type="text"
                name="subject"
                className="form-control"
                placeholder="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              ></textarea>
              <label htmlFor="message">Message :</label>
              <textarea
                type="text"
                name="message"
                className="form-control"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <button type="submit">Envoyer</button>
            </form>
          </div>
          <div className="col-md-6">
            <img src="blood.jpg" alt="Votre image" className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
