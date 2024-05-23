import React, { useState, useEffect } from "react"
import axios from "axios"
import { Card, CardBody, Row, Col } from "reactstrap"

const Miniwidget = props => {
  const [totalQuantite, setTotalQuantite] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/quantitysang")
        setTotalQuantite(response.data.totalQuantiteDisponible)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])
  const [nombreDonateurs, setNombreDonateurs] = useState(null)

  useEffect(() => {
    const fetchNombreDonateurs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/nombreDonnateurs",
        )
        setNombreDonateurs(response.data.nombreDonateurs)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchNombreDonateurs()
  }, [])
  const [nombreReservations, setNombreReservations] = useState(null)

  useEffect(() => {
    const fetchNombreReservations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/nombreReservations",
        )
        setNombreReservations(response.data.nombreReservations)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchNombreReservations()
  }, [])
  const [nombreEvenements, setNombreEvenements] = useState(null)

  useEffect(() => {
    const fetchNombreEvenements = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/nombreEvenements",
        )
        setNombreEvenements(response.data.nombreEvenements)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchNombreEvenements()
  }, [])
  return (
    <React.Fragment>
      <Row>
        <Col xl={3} sm={6}>
          <Card className="mini-stat bg-primary">
            <CardBody className="card-body mini-stat-img">
              <div className="mini-stat-icon"></div>
              <div className="text-white">
                <h6 className="text-uppercase mb-3 font-size-16 text-white">
                  Nombre évenements
                </h6>
                <h2 className="mb-4 text-white">{nombreEvenements}</h2>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xl={3} sm={6}>
          <Card className="mini-stat bg-primary">
            <CardBody className="card-body mini-stat-img">
              <div className="mini-stat-icon"></div>
              <div className="text-white">
                <h6 className="text-uppercase mb-3 font-size-16 text-white">
                  SANG COLLECTÉES 
                </h6>
                <h2 className="mb-4 text-white">{totalQuantite}</h2>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col xl={3} sm={6}>
          <Card className="mini-stat bg-primary">
            <CardBody className="card-body mini-stat-img">
              <div className="mini-stat-icon"></div>
              <div className="text-white">
                <h6 className="text-uppercase mb-3 font-size-16 text-white">
                  Nombre réservations
                </h6>
                <h2 className="mb-4 text-white">{nombreReservations}</h2>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xl={3} sm={6}>
          <Card className="mini-stat bg-primary">
            <CardBody className="card-body mini-stat-img">
              <div className="mini-stat-icon"></div>
              <div className="text-white">
                <h6 className="text-uppercase mb-3 font-size-16 text-white">
                  DONATEURS ENREGISTRÉS
                </h6>
                <h2 className="mb-4 text-white">{nombreDonateurs}</h2>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default Miniwidget
