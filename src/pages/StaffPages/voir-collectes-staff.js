import React, { useEffect, useState } from "react"
import axios from "axios"
import { Table, Row, Col, Card, CardBody, CardTitle } from "reactstrap"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"

import {
  getTasks as onGetTasks,
  addCardData as onAddCardData,
  updateCardData as onUpdateCardData,
  deleteKanban as OnDeleteKanban,
} from "store/tasks/actions"

//redux
import { useSelector, useDispatch } from "react-redux"
import { createSelector } from "reselect"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { Link } from "react-router-dom"
import { AddTeamMember } from "common/data"
import SimpleBar from "simplebar-react"
import moment from "moment"
import Spinners from "components/Common/Spinner"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"
import { connect } from "react-redux"

const Kanban = props => {
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
              <CardTitle className="h4">Table De Collectes</CardTitle>

              <div className="table-responsive">
                <Table className="table table-bordered mb-0">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nom</th>
                      <th>Date </th>
                      <th>Lieu</th>
                      <th>Objectif</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {collectes.map(collecte => (
                      <tr key={collecte._id}>
                        <td>{collecte._id}</td>
                        <td>{collecte.Nom}</td>
                        <td>{formatDate(collecte.date)}</td>
                        <td>{collecte.lieu}</td>
                        <td>{collecte.objectif}</td>
                        <td>{collecte.description}</td>
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

export default connect(null, { setBreadcrumbItems })(Kanban)
