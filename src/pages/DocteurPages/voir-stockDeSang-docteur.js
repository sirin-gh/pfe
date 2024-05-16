import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

import { Table, Row, Col, Card, CardBody, CardTitle } from "reactstrap"

import { connect } from "react-redux"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"

const BasicTable = props => {
  document.title = "Voir le Stock De Sang"

  const breadcrumbItems = [
    { title: "Voir le Stock De Sang", link: "#" },
    { title: "Tables", link: "#" },
    { title: "Table De Stock De Sang ", link: "#" },
  ]
  const navigate = useNavigate()

  const handleClick = () => {
    // Navigate to the desired route
    navigate("/ajouter-stockDeSang-docteur")
  }

  useEffect(() => {
    props.setBreadcrumbItems("Voir le Stock De Sang", breadcrumbItems)
  })
  const [sang, setsang] = useState([])
  const fetchsang = async () => {
    try {
      const response = await axios.get("http://localhost:5000/sangs")
      setsang(response.data)
    } catch (error) {
      console.error("Erreur lors de la récupération des stoks du sang:", error)
    }
  }
  useEffect(() => {
    fetchsang()
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
              <CardTitle className="h4">Table De Stock De Sang</CardTitle>

              <div className="table-responsive">
                <Table className="table table-bordered mb-0">
                  <thead>
                    <tr>
                      <th>Donneur</th>
                      <th>GroupeSanguin</th>
                      <th>NuméroDeLot</th>
                      <th>Rhésus</th>
                      <th>Quantité De sang</th>
                      <th>Date De Don</th>
                      <th>Récepteur </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sang.map(stock => (
                      <tr key={stock._id}>
                        <td>{stock.Donneur}</td>
                        <td>{stock.GroupeSanguin}</td>
                        <td>{stock.NuméroDeLot}</td>
                        <td>{stock.Rhésus}</td>
                        <td>{stock.QuantitéDisponible}</td>
                        <td>{formatDate(stock.DateDecollecte)}</td>
                        <td>{stock.récepteur}</td>

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
