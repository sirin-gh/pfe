import React, { useEffect, useState } from "react"
import axios from "axios"

import { Table, Row, Col, Card, CardBody, CardTitle } from "reactstrap"

import { connect } from "react-redux"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"
import { Link } from "react-router-dom"

const BasicTable = props => {
  document.title = "Réservation"

  const breadcrumbItems = [
    { title: "Réservation", link: "#" },
    { title: "Tables", link: "#" },
    { title: "Table De Réservation", link: "#" },
  ]

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
                          <Link
                            to="/consulter"
                            className="btn btn-primary mr-2"
                          >
                            Consulter
                          </Link>
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
