import React, { useEffect } from "react";
import {
  Table,
  Row,
  Col,
  Card,
  CardBody,
} from "reactstrap";
import { connect } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom

const BasicTable = (props) => {
  document.title = "Rapport";

  const breadcrumbItems = [
    { title: "Rapport", link: "#" },
    { title: "Tables", link: "#" },
    { title: "Table De Rapport", link: "#" },
  ];
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to the desired route
    navigate('/ajouter-rapport');
  };
  useEffect(() => {
    props.setBreadcrumbItems('Rapport', breadcrumbItems);
  }, []);

  return (
    <React.Fragment>
      <Row>
        <Col xl={12}> 
         <button  onClick={handleClick}className="btn btn-primary btn-lg " style={{marginLeft:1150}}>Ajouter</button>
          <Card>
            <CardBody>
              <div className="table-responsive">
                <Table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>ID</th>
                      <th>Nom</th>
                      <th>Prénom</th>
                      <th>Historique</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                      <td>
                        <Link to="/consulter" className="btn btn-primary  mr-2">Consulter</Link>
                        <button className="btn btn-danger mr-2"style={{marginLeft:20}}>Supprimer</button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                      <td>
                        <Link to="/consulter" className="btn btn-primary  mr-2">Consulter</Link>
                        <button className="btn btn-danger mr-2"style={{marginLeft:20}}>Supprimer</button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Larry</td>
                      <td>the Bird</td>
                      <td>@twitter</td>
                      <td>
                        <Link to="/consulter" className="btn btn-primary  mr-2">Consulter</Link>
                        <button className="btn btn-danger mr-2"style={{marginLeft:20}}>Supprimer</button>
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
  );
};

export default connect(null, { setBreadcrumbItems })(BasicTable);
