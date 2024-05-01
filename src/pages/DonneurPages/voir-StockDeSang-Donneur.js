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
  document.title = "Voir le Stock De Sang";

  
  const breadcrumbItems = [
    { title : "Voir le Stock De Sang", link : "#" },
    { title : "Tables", link : "#" },
    { title : "Table De Stock De Sang ", link : "#" },
  ]
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to the desired route
    navigate('/AjouterLeStockDeSang');
  };

  useEffect(() => {
    props.setBreadcrumbItems('Voir le Stock De Sang', breadcrumbItems)
  })
  return (
    <React.Fragment>
     
      <Row>
        <Col lg={12}>
        <button  onClick={handleClick}className="btn btn-primary btn-lg " style={{marginLeft:1150}}>Ajouter</button>
          <Card>
            <CardBody>
              <CardTitle className="h4">Table De Stock De Sang</CardTitle>
             

              <div className="table-responsive">
                <Table className="table table-bordered mb-0">
                  <thead>
                    <tr>
                    
                    <th>Donneur</th> 
                    <th>Type de Sang</th>
                      <th>Rhésus</th>
                      <th>Quantité De sang</th>
                      <th>Date De Don</th>
                     <th>Récepteur</th>
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
                      <td>Mark</td>
                      <td>Otto</td>
                       <td>@mdo</td>
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
