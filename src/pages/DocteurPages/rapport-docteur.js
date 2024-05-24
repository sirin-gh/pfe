import React, { useEffect, useState } from "react"
import { Table, Row, Col, Card, CardBody } from "reactstrap"
import { connect } from "react-redux"
import { setBreadcrumbItems } from "../../store/actions"
import { Link, useNavigate } from "react-router-dom" // Import Link from react-router-dom
import axios from "axios"
const BasicTable = props => {
  document.title = "Rapport"

  const breadcrumbItems = [
    { title: "Rapport", link: "#" },
    { title: "Tables", link: "#" },
    { title: "Table De Rapport", link: "#" },
  ]
  const navigate = useNavigate()

  const handleClick = () => {
    // Navigate to the desired route
    navigate("/ajouter-rapport")
  }
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
                    {rapports.map(rapport => (
                      <tr key={rapport._id}>
                        <td>{rapport._id}</td>
                        <td>{rapport.nomPrenom}</td>
                        <td>{rapport.GroupeSanguin}</td>
                        <td>{rapport.Rhésus}</td>
                        <td>{formatDate(rapport.dateHeure)}</td>
                        <td>{rapport.Adresse}</td>
                        <td>{rapport.Sexe}</td>
                        <td>{rapport.Email}</td>
                        <td>{formatDate(rapport.dateDeNaissance)}</td>
                        <td>{rapport.numéroDeTéléphone}</td>
                        <td>{rapport.confirmation ? "Oui" : "Non"}</td>
                        <td>{rapport.organisateur}</td>
                        <td>{rapport.QuantitéDisponible}</td>

                        {/* Affichez les autres informations du donateur ici */}
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
