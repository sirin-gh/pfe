import React, { useEffect } from "react"
import { useNavigate } from 'react-router-dom';


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
  document.title = "Table De Docteurs";

  
  const breadcrumbItems = [
    { title : "Voir Docteur", link : "#" },
    { title : "Tables", link : "#" },
    { title : "Tables De Docteur", link : "#" },
  ]
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to the desired route
    navigate('/AjouterDocteurs');
  };
  useEffect(() => {
    props.setBreadcrumbItems('Voir Docteur', breadcrumbItems)
  }) 
  return (
    <React.Fragment>
     
      <Row>
        <Col lg={12}> 
        
          <Card>
            <CardBody>
              <CardTitle className="h4">Table De Docteurs</CardTitle>
             

              <div className="table-responsive">
                <Table className="table table-bordered mb-0">
                  <thead>
                    <tr>
                    
                    <th>Nom</th>
                      <th>Prénom</th>
                      <th>Email</th>
                      <th>Adresse</th>
                      <th>Date Naissance</th>
                      <th>Num Tél</th>
                      <th>ID</th>
                      <th>Specialité</th>
                      <th>Expérience clinique</th>
                      <th>Num de licence</th>
               
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
                      <td>Otto</td>
                      <td>@mdo</td>
                       <td>@mdo</td>
                       
                    </tr>
                    <tr>
                    <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                     <td>the Bird</td>
                      <td>@twitter</td>
                      <td>the Bird</td>
                      <td>@twitter</td>
                      <td>Otto</td>
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
