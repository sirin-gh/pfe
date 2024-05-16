import "./Contact.css"
import { useState } from "react"

function Contact() {
  const [successMessage, setSuccessMessage] = useState("")
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

            <form>
              <label htmlFor="name">Name :</label>
              <input type="text" id="name" name="name" required />

              <label htmlFor="email">Email :</label>
              <input type="email" id="email" name="email" required />

              <label htmlFor="message">Message :</label>
              <textarea
                id="message"
                name="message"
                rows="5"
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
