import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

import { Table, Row, Col, Card, CardBody, CardTitle } from "reactstrap"

import { connect } from "react-redux"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"

const BasicTable = props => {
  document.title = "Table De Docteurs"

  const breadcrumbItems = [
    { title: "Voir Docteur", link: "#" },
    { title: "Tables", link: "#" },
    { title: "Tables De Docteur", link: "#" },
  ]
  const navigate = useNavigate()

  const handleClick = () => {
    // Navigate to the desired route
    navigate("/AjouterDocteurs")
  }
  useEffect(() => {
    props.setBreadcrumbItems("Voir Docteur", breadcrumbItems)
  })
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
              <CardTitle className="h4">Table De Docteurs</CardTitle>

              <div className="table-responsive">
                <Table className="table table-bordered mb-0">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nom</th>
                      <th>Prénom</th>
                      <th>Email</th>
                      <th>Adresse</th>
                      <th>Date Naissance</th>
                      <th>Num Tél</th>

                      <th>Specialité</th>
                    </tr>
                  </thead>
                  <tbody>
                    {docteurs.map(staf => (
                      <tr key={staf._id}>
                        <td>{staf._id}</td>
                        <td>{staf.nom}</td>
                        <td>{staf.prénom}</td>
                        <td>{staf.Email}</td>
                        <td>{staf.adresse}</td>
                        <td>{formatDate(staf.dateDeNaissance)}</td>
                        <td>{staf.numéroDeTéléphone}</td>
                        <td>{staf.specialité}</td>
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
