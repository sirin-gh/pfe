import React, { useEffect, useState } from "react"
import { Table, Row, Col, Card, CardBody } from "reactstrap"
import { connect } from "react-redux"
import { setBreadcrumbItems } from "../../store/actions"
import { Link } from "react-router-dom" // Import Link from react-router-dom
import axios from "axios"
const BasicTable = props => {
  document.title = "Rapport"

  const breadcrumbItems = [
    { title: "Rapport", link: "#" },
    { title: "Tables", link: "#" },
    { title: "Table De Rapport", link: "#" },
  ]

  useEffect(() => {
    props.setBreadcrumbItems("Rapport", breadcrumbItems)
  }, [])
  const [rapports, setrapports] = useState([])
  const fetchrapports = async () => {
    try {
      const response = await axios.get("http://localhost:5000/rapports")
      setrapports(response.data)
    } catch (error) {
      console.error("Erreur lors de la récupération des rapports:", error)
    }
  }
  useEffect(() => {
    fetchrapports()
  }, [])
  const [rapport, setRapport] = useState([])
  const [idDonneur, setIdDonneur] = useState("")

  useEffect(() => {
    // Retrieve idDonneur from local storage
    const storedIdDonneur = localStorage.getItem("idDonneur")
    if (storedIdDonneur) {
      setIdDonneur(storedIdDonneur)
    }
  }, [])

  useEffect(() => {
    // Fetch reports by idDonneur when idDonneur state changes
    const fetchRapportsByIdDonneur = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/rapports/donneur/${idDonneur}`,
        )
        setRapport(response.data)
      } catch (error) {
        console.error("Error fetching reports:", error)
      }
    }

    // Only fetch reports if idDonneur is set
    if (idDonneur) {
      fetchRapportsByIdDonneur()
    }
  }, [idDonneur])
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
        <Col xl={12}>
          <Card>
            <CardBody>
              <div className="table-responsive">
                {rapport.length === 0 ? (
                  <p>No reports found for this donor.</p>
                ) : (
                  <Table className="table table-hover mb-0">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>nom Prenom</th>
                        <th>Groupe Sanguin</th>
                        <th>Rhésus</th>
                        <th>date</th>
                        <th>Adresse</th>
                        <th>sexe</th>
                        <th>Email</th>
                        <th>Date De Naissance</th>
                        <th>Numéro De Téléphone</th>
                        <th>confirmation</th>
                        <th> organisateur</th>
                        <th> Quantité</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rapport.map(rappor => (
                        <tr key={rappor._id}>
                          <td>{rappor._id}</td>
                          <td>{rappor.nomPrenom}</td>
                          <td>{rappor.GroupeSanguin}</td>
                          <td>{rappor.Rhésus}</td>
                          <td>{formatDate(rappor.dateHeure)}</td>
                          <td>{rappor.Adresse}</td>
                          <td>{rappor.Sexe}</td>
                          <td>{rappor.Email}</td>
                          <td>{formatDate(rappor.dateDeNaissance)}</td>
                          <td>{rappor.numéroDeTéléphone}</td>
                          <td>{rappor.confirmation ? "Oui" : "Non"}</td>
                          <td>{rappor.organisateur}</td>
                          <td>{rappor.QuantitéDisponible}</td>

                          {/* Affichez les autres informations du donateur ici */}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
                <div></div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(BasicTable)
