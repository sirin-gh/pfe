import React, { useEffect, useState } from "react"
import Pusher from "pusher-js"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap"
import SimpleBar from "simplebar-react"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTint } from "@fortawesome/free-solid-svg-icons"

//i18n
import { withTranslation } from "react-i18next"

const NotificationDropdown = props => {
  const [unreadNotifications, setUnreadNotifications] = useState(0)
  const [notifications, setNotifications] = useState([])
  const [notifications1, setNotifications1] = useState([])
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false)
  useEffect(() => {
    const pusher = new Pusher("e902c9ff9a8358cc8d41", {
      cluster: "eu",
    })

    const channel = pusher.subscribe("reservation-channel")

    channel.bind("new-reservation", function (data) {
      console.log("notification récue", data)
      setNotifications(notifications => [
        {
          message: `Bonjour ${data.nomPrenom}, 

          Nous avons une excellente nouvelle à vous annoncer ! Une réservation de don de sang a été effectuée en votre nom dans cette date ${data.dateHeure}. Votre générosité sauve des vies !
          Merci pour votre engagement envers notre cause. Veuillez prendre contact avec nous pour organiser les détails de votre don.`,
          id: data.id,
          personne: data.nomPrenom,
        },
        ...notifications,
      ])
      setUnreadNotifications(count => count + 1)
    })

    return () => {
      channel.unbind_all()
      channel.unsubscribe()
    }
  }, [])
  useEffect(() => {
    const pusher = new Pusher("e902c9ff9a8358cc8d41", {
      cluster: "eu",
    })

    const channel1 = pusher.subscribe("sang-channel")

    channel1.bind("low-sang-alert", function (data) {
      console.log("notification récue du sang", data)
      setNotifications(notifications1 => [
        {
          message: `Alerte pour l'administrateur :

          La quantité de sang pour le groupe sanguin ${data.groupeSanguin} est inférieure à 10 litres. La quantité restante est de ${data.quantite} litres. 
          Merci de prendre des mesures appropriées pour gérer cette situation.`,
          id: data.id,
        },
        ...notifications1,
      ])
      setUnreadNotifications(count => count + 1)
    })

    return () => {
      channel1.unbind_all()
      channel1.unsubscribe()
    }
  }, [])
  const [testResult, setTestResult] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/test-quantite-sang",
        )
        setTestResult(response.data)
        setLoading(false)
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error)
      }
    }

    fetchData()
  }, [])
  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="dropdown d-inline-block ms-1"
        tag="li"
      >
        <DropdownToggle
          className="btn header-item noti-icon waves-effect"
          tag="button"
          id="page-header-notifications-dropdown"
        >
          <i className="ti-bell"></i>
          <span className="badge text-bg-danger rounded-pill">
            {unreadNotifications}
          </span>
        </DropdownToggle>

        <DropdownMenu className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0">
          <div className="p-3">
            <Row className="align-items-center">
              <Col>
                <h5 className="m-0">
                  {" "}
                  {props.t("Notifications")} ({unreadNotifications}){" "}
                </h5>
              </Col>
            </Row>
          </div>

          <SimpleBar style={{ height: "230px" }}>
            {notifications.map((notification, index) => (
              <Link to="#" className="text-reset notification-item">
                <div className="d-flex">
                  <div className="flex-shrink-0 me-3">
                    <div className="avatar-xs me-3">
                      <span className="avatar-title border-success rounded-circle ">
                        <FontAwesomeIcon icon={faTint} />
                      </span>
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="mt-0 mb-1">{notification.message}</h6>
                    <div className="text-muted"></div>
                  </div>
                </div>
              </Link>
            ))}
            {notifications1.map((notification, index) => (
              <Link to="#" className="text-reset notification-item">
                <div className="d-flex">
                  <div className="flex-shrink-0 me-3">
                    <div className="avatar-xs me-3">
                      <span className="avatar-title border-danger rounded-circle ">
                        <FontAwesomeIcon icon={faTint} />
                      </span>
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="mt-0 mb-1">{notification.message}</h6>
                    <div className="text-muted"></div>
                  </div>
                </div>
              </Link>
            ))}
          </SimpleBar>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

export default withTranslation()(NotificationDropdown)

NotificationDropdown.propTypes = {
  t: PropTypes.any,
}
