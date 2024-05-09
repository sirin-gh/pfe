import React, { useEffect, useState } from "react"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons"
import { confirmAlert } from "react-confirm-alert" // Importez la fonction confirmAlert
import "react-confirm-alert/src/react-confirm-alert.css"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap"
import { Table, Row, Col, Card, CardBody, CardTitle } from "reactstrap"
import { AvRadioGroup, AvRadio } from "availity-reactstrap-validation"
import { connect } from "react-redux"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"
import { Link, useNavigate } from "react-router-dom"

const BasicTable = props => {
  document.title = "Réservation"

  const breadcrumbItems = [
    { title: "Réservation", link: "#" },
    { title: "Tables", link: "#" },
    { title: "Table De Réservation", link: "#" },
  ]
  const navigate = useNavigate()

  const handleClick = () => {
    // Navigate to the desired route
    navigate("/ajouter-reservation")
  }

  useEffect(() => {
    props.setBreadcrumbItems("Réservation", breadcrumbItems)
  })
  const [reservations, setreservations] = useState([])
  const fetchreservations = async () => {
    try {
      const response = await axios.get("http://localhost:5000/reservations")
      setreservations(response.data)
    } catch (error) {
      console.error("Erreur lors de la récupération des reservations:", error)
    }
  }
  useEffect(() => {
    fetchreservations()
  }, [])
  const handleDeletereservation = ReservationId => {
    confirmAlert({
      title: "Confirmation",
      message: "Êtes-vous sûr de vouloir supprimer cette réservation?",
      buttons: [
        {
          label: "Oui",
          onClick: async () => {
            try {
              const response = await fetch(
                `http://localhost:5000/reservation/${ReservationId}`,
                {
                  method: "DELETE",
                },
              )
              if (response.ok) {
                alert("réservation supprimé avec succès.")
                fetchreservations()
                // Ajoutez ici toute autre logique que vous souhaitez exécuter après la suppression du donateur
              } else {
                throw new Error("La suppression du réservation a échoué.")
              }
            } catch (error) {
              console.error(
                "Erreur lors de la suppression du réservation:",
                error.message,
              )
              alert(
                "Erreur lors de la suppression du réservation. Veuillez réessayer.",
              )
            }
          },
        },
        {
          label: "Non",
          onClick: () => {}, // Aucune action nécessaire en cas de non confirmation
        },
      ],
    })
  }
  const [modalOpen7, setModalOpen7] = useState(false)
  const [selectedreservation, setSelectedreservation] = useState(null)

  // Définissez une fonction pour ouvrir le modal et stocker les informations du donateur sélectionné
  const openModal7 = reservation => {
    setSelectedreservation(reservation)
    setModalOpen7(true)
  }
  const handleEditreservation = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/update-reservation/${selectedreservation._id}`,
        selectedreservation,
      )
      console.log("réservation modifié avec succès:", response.data)
      toast.success("réservation modifié avec succès") // Afficher un toast de succès
      // Ajoutez ici toute autre logique que vous souhaitez exécuter après la modification du donateur
      setModalOpen7(false) // Fermer le modal après la modification réussie
    } catch (error) {
      console.error("Erreur lors de la modification du réservation:", error)
      toast.error("Erreur lors de la modification du réservation")
      // Affichez un message d'erreur ou prenez toute autre action nécessaire en cas d'échec de la modification
    }
  }
  const formatDate = dateString => {
    const date = new Date(dateString)
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }
  return (
    <React.Fragment>
      <Row>
        <Col lg={12}>
          <button
            onClick={handleClick}
            className="btn btn-primary btn-lg "
            style={{ marginBottom: "20px" }}
          >
            Ajouter
          </button>

          <Card>
            <CardBody>
              <CardTitle className="h4">Table De Réservation</CardTitle>

              <div className="table-responsive">
                <Table className="table table-bordered mb-0">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nom et prénom</th>
                      <th>Date et Heure</th>
                      <th>Groupe sanguin</th>
                      <th>Emplacement</th>
                      <th>donneur</th>
                      <th>Confirmation de réservation </th>
                      <th>Action </th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map(reservation => (
                      <tr key={reservation._id}>
                        <td>{reservation._id}</td>
                        <td>{reservation.nomPrenom}</td>
                        <td>{formatDate(reservation.dateHeure)}</td>
                        <td>{reservation.groupeSanguin}</td>
                        <td>{reservation.emplacement}</td>
                        <td>{reservation.donneur}</td>
                        <td>{reservation.confirmation ? "Oui" : "Non"}</td>
                        {/* Affichez les autres informations du donateur ici */}
                        <td>
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="text-danger mr-1"
                            onClick={() =>
                              handleDeletereservation(reservation._id)
                            }
                          />
                          <FontAwesomeIcon
                            icon={faEdit}
                            className="text-warning"
                            style={{ marginLeft: 20 }}
                            onClick={() => openModal7(reservation)}
                            //onClick={() => handleEditDonateur(donateur._id)}
                            //changer avec consulter
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Modal isOpen={modalOpen7} toggle={() => setModalOpen7(!modalOpen7)}>
        <ModalHeader toggle={() => setModalOpen7(!modalOpen7)}>
          Modifier réservation
        </ModalHeader>
        <ModalBody>
          {/* Affichez les informations du donateur dans un formulaire */}
          {selectedreservation && (
            <form>
              <div className="form-group">
                <label>Nom et Prénom</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedreservation.nomPrenom}
                  onChange={e =>
                    setSelectedreservation({
                      ...selectedreservation,
                      nomPrenom: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>date</label>
                <input
                  type="date"
                  className="form-control"
                  value={selectedreservation.dateHeure}
                  onChange={e =>
                    setSelectedreservation({
                      ...selectedreservation,
                      dateHeure: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>groupe Sanguin</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedreservation.groupeSanguin}
                  onChange={e =>
                    setSelectedreservation({
                      ...selectedreservation,
                      groupeSanguin: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>emplacement</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedreservation.emplacement}
                  onChange={e =>
                    setSelectedreservation({
                      ...selectedreservation,
                      emplacement: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>donneur</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedreservation.donneur}
                  onChange={e =>
                    setSelectedreservation({
                      ...selectedreservation,
                      donneur: e.target.value,
                    })
                  }
                />
              </div>

              {/* Affichez les autres champs du formulaire avec les informations du donateur */}
              {/* Assurez-vous de fournir des champs modifiables si vous souhaitez permettre la modification */}
            </form>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setModalOpen7(!modalOpen7)}>
            Fermer
          </Button>
          <Button color="primary" onClick={handleEditreservation}>
            Modifier
          </Button>
          {/* Ajoutez ici toute autre logique pour enregistrer les modifications */}
        </ModalFooter>
      </Modal>
      <ToastContainer />
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(BasicTable)
