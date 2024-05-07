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
  document.title = "Table De Collectes";

  
  const breadcrumbItems = [
    { title : "Voir Collectes", link : "#" },
    { title : "Tables", link : "#" },
    { title : "Tables De Collectes", link : "#" },
  ]
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to the desired route
    navigate('/ajouter-collectes');
  };
  useEffect(() => {
    props.setBreadcrumbItems('Voir Collectes', breadcrumbItems)
  })
  return (
    <React.Fragment>
     
      <Row>
        <Col lg={12}> 
        <button  onClick={handleClick}className="btn btn-primary btn-lg " style={{marginLeft:1150}}>Ajouter</button>
          <Card>
            <CardBody>
              <CardTitle className="h4">Table De Collectes</CardTitle>
             

              <div className="table-responsive">
                <Table className="table table-bordered mb-0">
                  <thead>
                    <tr>
                    <th>Nom</th>
                    <th>Date et heure</th>
                      <th>Lieu</th>
                     <th>Objectif</th>
                     <th>Description</th>
                       <th>Action</th>
                     
                      

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
                        {/* Add "Supprimer" and "Editer" buttons */}
                        <button className="btn btn-danger btn-sm mr-1">Supprimer</button>
                        <button className="btn btn-warning btn-sm" style={{marginLeft:20}}>Editer</button>
                      </td>
                       
                     
                    </tr>
                    <tr>
                    <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                      <td>Mark</td>
                      <td>Otto</td>
                     
                      <td>
                        {/* Add "Supprimer" and "Editer" buttons */}
                        <button className="btn btn-danger btn-sm mr-1">Supprimer</button>
                        <button className="btn btn-warning btn-sm" style={{marginLeft:20}}>Editer</button>
                      </td>
                      
                      
                    </tr>
                    <tr>
                    <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                      <td>Mark</td>
                      <td>Otto</td>
                    
                      <td>
                        {/* Add "Supprimer" and "Editer" buttons */}
                        <button className="btn btn-danger btn-sm mr-1">Supprimer</button>
                        <button className="btn btn-warning btn-sm" style={{marginLeft:20}}>Editer</button>
                      </td>
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
