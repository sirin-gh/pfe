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
  document.title = "Voir le Stock De Sang";

  
  const breadcrumbItems = [
    { title : "Voir le Stock De Sang", link : "#" },
    { title : "Tables", link : "#" },
    { title : "Table De Stock De Sang ", link : "#" },
  ]

  useEffect(() => {
    props.setBreadcrumbItems('Voir le Stock De Sang', breadcrumbItems)
  })
  return (
    <React.Fragment>
     
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <CardTitle className="h4">Table De Stock De Sang</CardTitle>
             

              <div className="table-responsive">
                <Table className="table table-bordered mb-0">
                  <thead>
                    <tr>
                    
                    <th>Type de Sang</th>
                      <th>Rhésus</th>
                      <th>Quantité</th>
                      <th>Date du Don</th>
                      <th>Qualité</th>
                      <th>Compatibilité</th>
                      <th>Statut du Don</th> 
                      <th>Donneur</th> 
                      <th>Récepteur</th>
                      <th>Destination</th>
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
