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
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const BasicTable = (props) => {
  document.title = "Rapport";

  const breadcrumbItems = [
    { title: "Rapport", link: "#" },
    { title: "Tables", link: "#" },
    { title: "Table De Rapport", link: "#" },
  ];

  useEffect(() => {
    props.setBreadcrumbItems('Rapport', breadcrumbItems);
  }, []);

  return (
    <React.Fragment>
      <Row>
        <Col xl={12}>
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
                        {/* Use Link for navigation */}
                        <Link to="/consulter" className="btn btn-primary mr-2">Consulter</Link>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                     <td>
                        <Link to="/path/to/destination" className="btn btn-primary mr-2">Consulter</Link>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Larry</td>
                      <td>the Bird</td>
                      <td>@twitter</td>
                      <td>
                        <Link to="/path/to/destination" className="btn btn-primary mr-2">Consulter</Link>
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
