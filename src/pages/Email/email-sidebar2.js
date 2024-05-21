import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Card,
} from "reactstrap"

// Import Editor
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

//Import images
import avatar2 from "../../assets/images/users/user-2.jpg"
import avatar3 from "../../assets/images/users/user-3.jpg"
import avatar4 from "../../assets/images/users/user-4.jpg"
import avatar6 from "../../assets/images/users/user-6.jpg"

const EmailSideBar2 = () => {
  const [modal, setmodal] = useState(false)
  const [docteurs, setdocteurs] = useState([])
  const fetchDocteurs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/docteurs")
      setdocteurs(response.data)
    } catch (error) {
      console.error("Erreur lors de la récupération des docteurs:", error)
    }
  }
  useEffect(() => {
    fetchDocteurs()
  }, [])
  return (
    <React.Fragment>
      <Card
        className="email-leftbar"
        style={{ width: "25%", marginRight: "10px" }}
      >
        <h5 className="mt-4">docteurs</h5>

        <div className="mt-3">
          {docteurs.map(docteur => (
            <Link to="#" className="d-flex">
              <div className="flex-shrink-0 me-3">
                <img
                  className="d-flex me-3 rounded-circle"
                  src="user_icon_2.svg.png"
                  alt="lexa"
                  height="36"
                />
              </div>
              <div className="flex-grow-1 chat-user-box">
                <p className="user-title m-0">{docteur.nom}</p>
                <p className="text-muted">{docteur.Email}</p>
              </div>
            </Link>
          ))}
        </div>
      </Card>

      <Modal
        isOpen={modal}
        role="dialog"
        autoFocus={true}
        centered={true}
        className="exampleModal"
        tabIndex="-1"
        toggle={() => {
          setmodal(!modal)
        }}
      >
        <div className="modal-content">
          <ModalHeader
            toggle={() => {
              setmodal(!modal)
            }}
          >
            New Message
          </ModalHeader>
          <ModalBody>
            <form>
              <div className="mb-3">
                <Input type="email" className="form-control" placeholder="To" />
              </div>

              <div className="mb-3">
                <Input
                  type="text"
                  className="form-control"
                  placeholder="Subject"
                />
              </div>
              <Editor
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
              />
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              color="secondary"
              onClick={() => {
                setmodal(!modal)
              }}
            >
              Close
            </Button>
            <Button type="button" color="primary">
              Send <i className="fab fa-telegram-plane ms-1"></i>
            </Button>
          </ModalFooter>
        </div>
      </Modal>
    </React.Fragment>
  )
}

export default EmailSideBar2
