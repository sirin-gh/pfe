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
import { Link } from "react-router-dom";

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
                    
                    
                      <th>Date et Heure</th>
                      <th>Groupe sanguin</th>
                       <th>Emplacement</th>
                     <th>Organisateur</th>
                     <th>Confirmation de réservation </th>
                     <th>Action </th>
                     
                      

                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                    <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                      <td>Mark</td>
                      <td>Otto</td>
                        <td>
                        <Link to="/consulter" className="btn btn-primary mr-2">Consulter</Link>
                      </td>
                      
                     
                    </tr>
                    <tr>
                    
                      
                      
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
