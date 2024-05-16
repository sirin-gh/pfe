import React, { Component } from "react"
import { Card, CardBody } from "reactstrap"
import { Link } from "react-router-dom"
import axios from "axios"

//Import Images
import user1 from "../../assets/images/users/user-1.jpg"
import user2 from "../../assets/images/users/user-2.jpg"
import user3 from "../../assets/images/users/user-3.jpg"
import user4 from "../../assets/images/users/user-4.jpg"
import user5 from "../../assets/images/users/user-5.jpg"
import user6 from "../../assets/images/users/user-6.jpg"

class Inbox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      staff: [],
    }
  }

  componentDidMount() {
    this.fetchStaff()
  }

  fetchStaff = async () => {
    try {
      const response = await axios.get("http://localhost:5000/staff")
      this.setState({ staff: response.data })
    } catch (error) {
      console.error("Erreur lors de la récupération des staff:", error)
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
            <h4 className="card-title mb-3">Staffs</h4>
            <div className="inbox-wid">
              {this.state.staff.map((staffMember, index) => (
                <Link key={index} to="#" className="text-dark">
                  <div className="inbox-item">
                    <div className="inbox-item-img float-start me-3">
                      <img
                        src="user_icon_2.svg.png"
                        className="avatar-sm rounded-circle"
                        alt=""
                      />
                    </div>
                    <h6 className="inbox-item-author mb-1 font-size-16">
                      {staffMember.nom}
                      {staffMember.prénom}
                    </h6>
                    <p className="inbox-item-text text-muted mb-0">
                      {staffMember.Email}
                    </p>
                    <p className="inbox-item-date text-muted">
                      {this.formatDate(staffMember.dateDeNaissance)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </CardBody>
        </Card>
      </React.Fragment>
    )
  }
}

export default Inbox
