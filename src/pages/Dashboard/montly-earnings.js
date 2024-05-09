import React, { useState, useEffect } from "react"
import axios from "axios"
import { Card, CardBody, Row, CardTitle } from "reactstrap"
import DonutChart from "../AllCharts/DonutChart"

const MonthlyEarnings = props => {
  const [pourcentages, setPourcentages] = useState([])

  useEffect(() => {
    const fetchPourcentages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/pourcentage-quantite",
        )
        setPourcentages(response.data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchPourcentages()
  }, [])
  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <CardTitle className="h4 mb-4">
            Répartition des Groupes Sanguins
          </CardTitle>

          <Row className="text-center mt-4">
            {pourcentages.map((pourcentage, index) => (
              <div className="col-6">
                <h5 className="font-size-20">
                  {pourcentage.GroupeSanguin}:{" "}
                  {pourcentage.Pourcentage.toFixed(2)}%
                </h5>
                <p className="text-muted">Pourcentage de la population</p>
              </div>
            ))}
          </Row>
          <div dir="ltr">
            {/* Ici, vous pouvez inclure n'importe quel composant de graphique lié à la répartition des groupes sanguins */}
            {/* Par exemple, vous pouvez utiliser le composant DonutChart pour visualiser la répartition */}
            <DonutChart />
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default MonthlyEarnings
