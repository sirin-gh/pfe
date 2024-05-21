import React, { useEffect, useRef, useState } from "react"
import { Row, Col, Card, Input } from "reactstrap"
import { connect } from "react-redux"
import axios from "axios"
//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
//Import Email Sidebar
import EmailSideBar from "../Email/email-sidebar"
import { Editor } from "react-draft-wysiwyg"
import EmailSideBar2 from "pages/Email/email-sidebar2"

const ContactezDocteur = props => {
  document.title = "Chat | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  const breadcrumbItems = [
    { title: "Lexa", link: "#" },
    { title: "Chat", link: "#" },
    { title: "Chat", link: "#" },
  ]

  useEffect(() => {
    props.setBreadcrumbItems("Chat", breadcrumbItems)
  })

  const [curMessage, setcurMessage] = useState("")
  const [subject, setsubject] = useState("")
  const addMessage = () => {
    // Appel de l'API avec Axios
    axios
      .post("http://localhost:5000/create-message", {
        to: "abdessamadaya1@gmail.com",
        subject: subject,
        text: curMessage,
      })
      .then(response => {
        console.log(response.data)
        // Réinitialiser le champ de saisie et afficher un toast de succès
        setcurMessage("")
        setsubject("")
        toast.success("E-mail envoyé avec succès")
      })
      .catch(error => {
        console.error("Erreur lors de la requête API:", error)
        // Afficher un toast d'erreur
        toast.error("Erreur lors de l'envoi de l'e-mail")
      })
  }

  return (
    <React.Fragment>
      <Row>
        <Col xs="12">
          {/* Render Email SideBar */}
          <EmailSideBar2 />

          <div className="email-rightbar mb-3">
            <Card>
              <div className="card-body">
                <div>
                  <div className="mb-3">
                    <Input
                      type="email"
                      className="form-control"
                      placeholder="To"
                    />
                  </div>

                  <div className="mb-3">
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Subject"
                      value={subject}
                      onChange={e => {
                        setsubject(e.target.value)
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Message"
                      value={curMessage}
                      onChange={e => {
                        setcurMessage(e.target.value)
                      }}
                    />
                  </div>

                  <div className="btn-toolbar form-group mb-0">
                    <div className="">
                      <button
                        className="btn btn-primary waves-effect waves-light"
                        onClick={() => addMessage()}
                      >
                        <span>Send</span>{" "}
                        <i className="fab fa-telegram-plane ms-2"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </Col>
      </Row>
      <ToastContainer />
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(ContactezDocteur)
