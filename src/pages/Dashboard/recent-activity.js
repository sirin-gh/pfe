import React, { useState, useEffect } from "react"
import { Card, CardBody } from "reactstrap"
import { Link } from "react-router-dom"
import axios from "axios"

const RecentActivity = () => {
  const [evenemets, setevenemets] = useState([])
  const fetchevenements = async () => {
    try {
      const response = await axios.get("http://localhost:5000/evenements")
      setevenemets(response.data)
    } catch (error) {
      console.error("Erreur lors de la récupération des evenements:", error)
    }
  }
  useEffect(() => {
    fetchevenements()
  }, [])
  // Fonction pour formater la date au format souhaité
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
      <Card>
        <CardBody>
          <h4 className="card-title mb-4">Liste des Evenements</h4>
          <ol className="activity-feed mb-0">
            {evenemets.map((evenement, index) => (
              <li key={index} className="feed-item">
                <div className="feed-item-list">
                  <span className="date">{formatDate(evenement.date)}</span>
                  <span className="activity-text">
                    {" "}
                    {evenement.description}
                  </span>
                </div>
              </li>
            ))}
          </ol>

          <div className="text-center">
            <Link
              to="http://localhost:3000/Evenement"
              className="btn btn-sm btn-primary"
            >
              Plus
            </Link>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default RecentActivity
