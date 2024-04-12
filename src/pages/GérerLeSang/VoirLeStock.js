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
  document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";

  
  const breadcrumbItems = [
    { title : "Lexa", link : "#" },
    { title : "Tables", link : "#" },
    { title : "Basic Tables", link : "#" },
  ]

  useEffect(() => {
    props.setBreadcrumbItems('Basic Tables', breadcrumbItems)
  })
  return (
    <React.Fragment>
     
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <CardTitle className="h4">Table De Stock</CardTitle>
             

              <div className="table-responsive">
                <Table className="table table-bordered mb-0">
                  <thead>
                    <tr>
                    
                    <th>Type de Sang</th>
                      <th>Rhésus</th>
                      <th>Quantité de Sang</th>
                      <th>Date du Don</th>
                      <th>Qualité du Sang</th>
                      <th>Compatibilité</th>
                      <th>Statut du Don</th> 
                      <th>Donneur</th> 
                      <th>Récepteur</th>
                      <th>Destination du Sang</th>
                      <th>Tests</th>
                      <th>Stockage</th>
                     

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
                       <td>@mdo</td>
                       <td>Otto</td>
                      <td>@mdo</td>
                       <td>@mdo</td>
                       <td>@mdo</td>
                     
                    </tr>
                    <tr>
                    <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                       <td>@mdo</td>
                       <td>@mdo</td>
                       <td>Otto</td>
                      <td>@mdo</td>
                       <td>@mdo</td>
                       <td>@mdo</td>
                      
                    </tr>
                    <tr>
                    <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                       <td>@mdo</td>
                       <td>@mdo</td>
                       <td>Otto</td>
                      <td>@mdo</td>
                       <td>@mdo</td>
                       <td>@mdo</td>
                      
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
