import React, { useEffect } from "react";
import {
  Table,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
} from "reactstrap";
import { connect } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";

const BasicTable = (props) => {
  document.title = "Table De Donneurs";

  const breadcrumbItems = [
    { title: "Voir Donneurs", link: "#" },
    { title: "Tables", link: "#" },
    { title: "Tables De Donneurs", link: "#" },
  ];

  useEffect(() => {
    props.setBreadcrumbItems("Table De Donneurs", breadcrumbItems);
  }, []);

  return (
    <React.Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <CardTitle className="h4">Table De Donneurs</CardTitle>

              <div className="table-responsive">
                <Table className="table table-bordered mb-0">
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Prénom</th>
                      <th>Adresse</th>
                      <th>Date De Naissance</th>
                      <th>Numéro De Téléphone</th>
                      <th>Email</th>
                      <th>Groupe Sanguin</th>
                      <th>Sexe</th>
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
                      <td>@mdo</td>
                      <td>
                        {/* Add "Supprimer" and "Editer" buttons */}
                        <button className="btn btn-danger btn-sm mr-1">Supprimer</button>
                        <button className="btn btn-warning btn-sm">Editer</button>
                      </td>
                    </tr>
                    <tr>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                      <td>@mdo</td>
                      <td>Jacob</td>
                      <td>@mdo</td>
                      <td>
                        <button className="btn btn-danger btn-sm mr-1">Supprimer</button>
                        <button className="btn btn-warning btn-sm">Editer</button>
                      </td>
                    </tr>
                    <tr>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                      <td>the Bird</td>
                      <td>@twitter</td>
                      <td>the Bird</td>
                      <td>@twitter</td>
                      <td>the Bird</td>
                      <td>
                        <button className="btn btn-danger btn-sm mr-1">Supprimer</button>
                        <button className="btn btn-warning btn-sm">Editer</button>
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
