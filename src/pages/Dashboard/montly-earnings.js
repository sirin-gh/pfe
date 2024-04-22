import React from "react";
import { Card, CardBody, Row, CardTitle } from "reactstrap";
import DonutChart from "../AllCharts/DonutChart";

const MonthlyEarnings = (props) => {
    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <CardTitle className="h4 mb-4">Répartition des Groupes Sanguins</CardTitle>

                    <Row className="text-center mt-4">
                        <div className="col-6">
                            <h5 className="font-size-20">Groupe A : 30%</h5>
                            <p className="text-muted">Pourcentage de la population</p>
                        </div>
                        <div className="col-6">
                            <h5 className="font-size-20">Groupe B : 25%</h5>
                            <p className="text-muted">Pourcentage de la population</p>
                        </div>
                        <div className="col-6">
                            <h5 className="font-size-20">Groupe AB : 15%</h5>
                            <p className="text-muted">Pourcentage de la population</p>
                        </div>
                        <div className="col-6">
                            <h5 className="font-size-20">Groupe O : 30%</h5>
                            <p className="text-muted">Pourcentage de la population</p>
                        </div>
                    </Row>
                    <div dir="ltr">
                        {/* Ici, vous pouvez inclure n'importe quel composant de graphique lié à la répartition des groupes sanguins */}
                        {/* Par exemple, vous pouvez utiliser le composant DonutChart pour visualiser la répartition */}
                        <DonutChart />
                    </div>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default MonthlyEarnings;
