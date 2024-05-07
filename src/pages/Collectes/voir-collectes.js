import React, { useEffect, useState } from "react"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons"
import { confirmAlert } from "react-confirm-alert" // Importez la fonction confirmAlert
import "react-confirm-alert/src/react-confirm-alert.css"
import { useNavigate } from "react-router-dom"
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap"
import { Table, Row, Col, Card, CardBody, CardTitle } from "reactstrap"

import { connect } from "react-redux"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"

const BasicTable = props => {
  document.title = "Table De Collectes"

  const breadcrumbItems = [
    { title: "Voir Collectes", link: "#" },
    { title: "Tables", link: "#" },
    { title: "Tables De Collectes", link: "#" },
  ]
  const navigate = useNavigate()

  const handleClick = () => {
    // Navigate to the desired route
    navigate("/ajouter-collectes")
  }
  useEffect(() => {
    props.setBreadcrumbItems("Voir Collectes", breadcrumbItems)
  })
  const [collectes, setcollectes] = useState([])
  const fetchcollects = async () => {
    try {
      const response = await axios.get("http://localhost:5000/collectes")
      setcollectes(response.data)
    } catch (error) {
      console.error("Erreur lors de la récupération des docteurs:", error)
    }
  }
  useEffect(() => {
    fetchcollects()
  }, [])
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
              <CardTitle className="h4">Table De Collectes</CardTitle>

              <div className="table-responsive">
                <Table className="table table-bordered mb-0">
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Date et heure</th>
                      <th>Lieu</th>
                      <th>Objectif</th>
                      <th>Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {collectes.map(collecte => (
                      <tr key={collecte._id}>
                        <td>{collecte._id}</td>
                        <td>{collecte.nom}</td>
                        <td>{collecte.prénom}</td>
                        <td>{collecte.Email}</td>
                        <td>{collecte.adresse}</td>

                        {/* Affichez les autres informations du donateur ici */}
                        <td>
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="text-danger mr-1"
                            //onClick={() => handleDeleteDocteur(staf._id)}
                          />
                          <FontAwesomeIcon
                            icon={faEdit}
                            className="text-warning"
                            style={{ marginLeft: 20 }}
                            //onClick={() => openModal3(staf)}
                            //onClick={() => handleEditDonateur(donateur._id)}
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
