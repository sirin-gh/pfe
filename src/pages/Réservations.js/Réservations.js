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
  document.title = "Réservation";

  
  const breadcrumbItems = [
    { title : "Réservation", link : "#" },
    { title : "Tables", link : "#" },
    { title : "Table De Réservation", link : "#" },
  ]

  useEffect(() => {
    props.setBreadcrumbItems('Réservation', breadcrumbItems)
  })
  return (
    <React.Fragment>
     
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <CardTitle className="h4">Table De Réservation</CardTitle>
             

              <div className="table-responsive">
                <Table className="table table-bordered mb-0">
                  <thead>
                    <tr>
                    
                    <th>Nom de l'événement</th>
                      <th>Date et heure de l'événement</th>
                      <th>Lieu</th>
                      <th>Emplacement</th>
                      <th>Type de l'événement</th>
                      <th>Organisateur</th>
                      <th>Participants</th>
                      <th>Activités</th> 
                      

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
                       <td>@mdo</td>
                      
                     
                    </tr>
                    <tr>
                    <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                     <td>Thornton</td>
                      <td>@fat</td>
                      <td>@mdo</td>
                      <td>Jacob</td>
                      
                      
                    </tr>
                    <tr>
                    <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                     <td>the Bird</td>
                      <td>@twitter</td>
                      <td>the Bird</td>
                      <td>@twitter</td>
                     
                      
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
