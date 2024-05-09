import React, { Component } from "react"
import axios from "axios"
import C3Chart from "react-c3js"
import "c3/c3.css"

class BloodTypeDonutChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      percentages: [],
    }
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/pourcentage-quantite")
      .then(response => {
        this.setState({ percentages: response.data })
      })
      .catch(error => {
        console.error("Error fetching data:", error)
      })
  }

  render() {
    const { percentages } = this.state

    const data = {
      columns: percentages.map(pourcentage => [
        pourcentage.GroupeSanguin,
        pourcentage.Pourcentage,
      ]),
      type: "donut",
    }

    const donut = {
      title: "Répartition",
      width: 30,
      label: { show: false },
    }

    const color = {
      pattern: ["#f0f1f4", "#7a6fbe", "#28bbe3", "#ff7f0e"], // Couleurs pour chaque groupe sanguin
    }

    const size = {
      height: 300,
    }

    return (
      <React.Fragment>
        <C3Chart
          data={data}
          donut={donut}
          color={color}
          size={size}
          dir="ltr"
        />
      </React.Fragment>
    )
  }
}

export default BloodTypeDonutChart
