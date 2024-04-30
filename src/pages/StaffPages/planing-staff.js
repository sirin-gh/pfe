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
  document.title = "Planing";

  
  const breadcrumbItems = [
    { title : "Planing", link : "#" },
    { title : "Tables", link : "#" },
    { title : "Table De Planing", link : "#" },
  ]

  useEffect(() => {
    props.setBreadcrumbItems('Planing', breadcrumbItems)
  })
  return (
    <React.Fragment>
     
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
               <div className="table-responsive">
                <Table className="table mb-0">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Date</th>
                      <th>Heure</th>
                      <th>Emplacement</th>
                      <th>Type de don</th>
                      <th>Nom du personnel</th>
                      <th>Contact</th>
                      <th>Remarques</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="table-light">
                      <th scope="row">1</th>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                    </tr>

                    <tr className="table-success">
                      <th scope="row">2</th>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                      
                      
                    </tr>

                    <tr className="table-info">
                      <th scope="row">3</th>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                    </tr>

                    <tr className="table-warning">
                      <th scope="row">4</th>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                      
                    </tr>

                    <tr className="table-danger">
                      <th scope="row">5</th>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                    </tr> 

                    <tr className="table-light">
                      <th scope="row">6</th>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                    </tr>

                    <tr className="table-success">
                      <th scope="row">7</th>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                    </tr> 

                    <tr className="table-info">
                      <th scope="row">8</th>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                    </tr>  
                    <tr className="table-warning">
                      <th scope="row">9</th>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                      
                    </tr> 
                    <tr className="table-danger">
                      <th scope="row">10</th>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
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
