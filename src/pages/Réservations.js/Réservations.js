import React, { useEffect, useState } from "react"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons"
import { confirmAlert } from "react-confirm-alert" // Importez la fonction confirmAlert
import "react-confirm-alert/src/react-confirm-alert.css"

import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap"
import { Table, Row, Col, Card, CardBody, CardTitle } from "reactstrap"

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
                      <th>Confirmation de réservation </th>
                      <th>Action </th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map(reservation => (
                      <tr key={reservation._id}>
                        <td>{reservation._id}</td>
                        <td>{reservation.NomcompletDuDonneur}</td>
                        <td>{reservation.DatedeRéservation}</td>
                        <td>{reservation.GroupeSanguin}</td>
                        <td>{reservation.emplacement}</td>
                        <td>confirmé</td>
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
                            //onClick={() => openModal3(staf)}
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
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(BasicTable)
