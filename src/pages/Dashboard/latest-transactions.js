import React, { Component } from "react"
import { Table, Card, CardBody, Button } from "reactstrap"
import axios from "axios"

//Import Images
import user2 from "../../assets/images/users/user-2.jpg"
import user3 from "../../assets/images/users/user-3.jpg"
import user4 from "../../assets/images/users/user-4.jpg"
import user5 from "../../assets/images/users/user-5.jpg"
import user6 from "../../assets/images/users/user-6.jpg"

class LatestTransactions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      transactions: [],
      sang: [],
    }
  }

  componentDidMount() {
    this.fetchSang()
  }

  fetchSang = async () => {
    try {
      const response = await axios.get("http://localhost:5000/sangs")
      this.setState({ sang: response.data })
    } catch (error) {
      console.error("Erreur lors de la récupération des stoks du sang:", error)
    }
  }
  formatDate = dateString => {
    const date = new Date(dateString)
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }
  render() {
    return (
      <React.Fragment>
        <Card>
          <CardBody>
            <h4 className="card-title mb-4">Stock De Sang</h4>

            <div className="table-responsive" >
              <Table className="align-middle table-centered table-vertical table-nowrap">
                <tbody>
                  {this.state.sang.map((stock, key) => (
                    <tr key={key}>
                      <td>
                        <img
                          src="user_icon_2.svg.png"
                          alt="user"
                          className="avatar-xs rounded-circle me-2"
                        />{" "}
                        {stock.Donneur}
                      </td>
                      <td>
                        <i
                          className={"mdi mdi-checkbox-blank-circle  text-"}
                        ></i>{" "}
                        {stock.GroupeSanguin}
                      </td>
                      <td>
                        {stock.QuantitéDisponible}
                        <p className="m-0 text-muted font-size-14">Quantité</p>
                      </td>
                      <td>
                        {this.formatDate(stock.DateDecollecte)}
                        <p className="m-0 text-muted font-size-14">Date</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </CardBody>
        </Card>
      </React.Fragment>
    )
  }
}

export default LatestTransactions
