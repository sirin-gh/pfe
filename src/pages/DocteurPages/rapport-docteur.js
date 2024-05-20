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
                      <th>titre</th>
                      <th>description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rapports.map(rapport => (
                      <tr key={rapport._id}>
                        <td>{rapport._id}</td>
                        <td>{rapport.titre}</td>
                        <td>{rapport.description}</td>

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
