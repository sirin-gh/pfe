import React, { useEffect, useState } from "react"
import axios from "axios"

import { Table, Row, Col, Card, CardBody, CardTitle } from "reactstrap"

import { connect } from "react-redux"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"

const BasicTable = props => {
  document.title = "Table De Staff"

  const breadcrumbItems = [
    { title: "Voir Staff", link: "#" },
    { title: "Tables", link: "#" },
    { title: "Tables De Staff", link: "#" },
  ]

  useEffect(() => {
    props.setBreadcrumbItems("Voir Staff", breadcrumbItems)
  })
  const [staff, setstaff] = useState([])
  const fetchStaff = async () => {
    try {
      const response = await axios.get("http://localhost:5000/staff")
      setstaff(response.data)
    } catch (error) {
      console.error("Erreur lors de la récupération des staff:", error)
    }
  }
  useEffect(() => {
    fetchStaff()
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
              <CardTitle className="h4">Table De Staff</CardTitle>

              <div className="table-responsive">
                <Table className="table table-bordered mb-0">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nom</th>
                      <th>Prénom</th>
                      <th>Email</th>
                      <th>Adresse</th>
                      <th>Date De Naissance</th>
                      <th>Numéro De Téléphone</th>

                      <th>Position</th>
                      <th>Statut d'emploi</th>
                      <th>Département </th>
                    </tr>
                  </thead>
                  <tbody>
                    {staff.map(staf => (
                      <tr key={staf._id}>
                        <td>{staf._id}</td>
                        <td>{staf.nom}</td>
                        <td>{staf.prénom}</td>
                        <td>{staf.Email}</td>
                        <td>{staf.adresse}</td>
                        <td>{formatDate(staf.dateDeNaissance)}</td>
                        <td>{staf.position}</td>
                        <td>{staf.numéroDeTéléphone}</td>
                        <td>{staf.StatutDemploi}</td>
                        <td>{staf.Département}</td>
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
