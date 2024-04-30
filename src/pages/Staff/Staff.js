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
  document.title = "Table De Staff";

  
  const breadcrumbItems = [
    { title : "Voir Staff", link : "#" },
    { title : "Tables", link : "#" },
    { title : "Tables De Staff", link : "#" },
  ]
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to the desired route
    navigate('/AjouterStaff');
  };
  useEffect(() => {
    props.setBreadcrumbItems('Voir Staff', breadcrumbItems)
  })
  return (
    <React.Fragment>
     
      <Row>
        <Col lg={12}> 
        <button  onClick={handleClick}className="btn btn-primary btn-lg " style={{marginLeft:1150}}>Ajouter</button>
          <Card>
            <CardBody>
              <CardTitle className="h4">Table De Staff</CardTitle>
             

              <div className="table-responsive">
                <Table className="table table-bordered mb-0">
                  <thead>
                    <tr>
                    
                    <th>Nom</th>
                      <th>Prénom</th>
                      <th>Email</th>
                      <th>Adresse</th>
                      <th>Date De Naissance</th>
                      <th>Numéro De Téléphone</th>
                      <th>ID</th>
                      <th>Position</th>
                      <th>Statut d'emploi</th>
                      <th>Département </th>
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
                      <td>@mdo</td>
                      <td>@mdo</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                      <td>@mdo</td>
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
                     <td>Thornton</td>
                      <td>@fat</td>
                      <td>@mdo</td>
                      <td>@mdo</td>
                      <td>@fat</td>
                      <td>@mdo</td>
                      <td>@mdo</td>
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
                     <td>the Bird</td>
                      <td>@twitter</td>
                      <td>the Bird</td>
                      <td>the Bird</td>
                      <td>@twitter</td>
                      <td>the Bird</td>
                      <td>the Bird</td>
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
