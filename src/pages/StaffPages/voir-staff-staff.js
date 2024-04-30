import React, { useEffect } from "react"


import {
  Table,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
} from "reactstrap"

import { connect } from "react-redux";

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions";

const BasicTable = (props) => {
  document.title = "Table De Staff";

  
  const breadcrumbItems = [
    { title : "Voir Staff", link : "#" },
    { title : "Tables", link : "#" },
    { title : "Tables De Staff", link : "#" },
  ]

  useEffect(() => {
    props.setBreadcrumbItems('Voir Staff', breadcrumbItems)
  })
  return (
    <React.Fragment>
     
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <CardTitle className="h4">Table De Staff</CardTitle>
             

              <div className="table-responsive">
                <Table className="table table-bordered mb-0">
                  <thead>
                    <tr>
                    
                    <th>Nom</th>
                      <th>Prénom</th>
                      <th>Adresse</th>
                      <th>Date De Naissance</th>
                      <th>Numéro De Téléphone</th>
                      <th>Email</th>
                      

                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                    <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                       
                     
                    </tr>
                    <tr>
                    <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                     <td>Thornton</td>
                      <td>@fat</td>
                      <td>@mdo</td>
                      
                      
                    </tr>
                    <tr>
                    <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                     <td>the Bird</td>
                      <td>@twitter</td>
                      <td>the Bird</td>
                     
                      
                    </tr>
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

export default connect(null, { setBreadcrumbItems })(BasicTable);
