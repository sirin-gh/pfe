import React, { useEffect } from "react"

import { connect } from "react-redux"
import { Row, Col } from "reactstrap"

// Pages Components
import Miniwidget from "./Miniwidget"
import MonthlyEarnings from "./montly-earnings"
import EmailSent from "./email-sent"
import MonthlyEarnings2 from "./montly-earnings2"
import Inbox from "./inbox"
import RecentActivity from "./recent-activity"
import WidgetUser from "./widget-user"
import YearlySales from "./yearly-sales"
import LatestTransactions from "./latest-transactions"
import LatestOrders from "./latest-orders"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"

const Dashboard = props => {
  document.title = "Dashboard des dons de sang"

  const breadcrumbItems = [
    { title: "Dons de sang", link: "#" },
    { title: "Dashboard des dons de sang", link: "#" },
  ]

  useEffect(() => {
    props.setBreadcrumbItems("Dashboard des dons de sang", breadcrumbItems)
  })

  const reports = [
    {
      title: "Dons reçus",
      total: "1,587DT",
      average: "+11%",
      badgecolor: "info",
    },
    {
      title: "SANG COLLECTÉES ",
      iconClass: "buffer",
      total: "100L",
      average: "-29%",
      badgecolor: "danger",
    },
    {
      title: "Dons par donateur",
      iconClass: "tag-text-outline",
      total: "15DT",
      average: "0%",
      badgecolor: "warning",
    },
    {
      title: "DONATEURS ENREGISTRÉS",
      iconClass: "briefcase-check",
      total: "1890",
      average: "+89%",
      badgecolor: "info",
    },
  ]

  return (
    <React.Fragment>
      {/*mimi widgets */}
      <Miniwidget reports={reports} />

      <Row>
        <Col xl="3">
          {/* Monthly Earnings */}
          <MonthlyEarnings />
        </Col>

        <Col xl="9" lg="10">
          {/* inbox */}
          <Inbox />
        </Col>
      </Row>
      <Row>
        <Col xl="4" lg="9">
          {/* recent activity */}
          <RecentActivity />
        </Col>
        <Col xl="8">
          {/* Les Donneurs*/}
          <LatestTransactions />
        </Col>
      </Row>

      <Row></Row>
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(Dashboard)
