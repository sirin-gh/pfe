import React, { Component } from 'react';
import { Row, Col, Card, CardBody } from "reactstrap";
import ReactApexChart from 'react-apexcharts';

class DistributionBesoinSang extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                colors: ['#ccc', '#7a6fbe', 'rgb(40, 187, 227)'],
                chart: {
                    toolbar: {
                        show: false,
                    },
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth',
                    width: 0.1,
                },
                grid: {
                    borderColor: '#f8f8fa',
                    row: {
                        colors: ['transparent', 'transparent'],
                        opacity: 0.5
                    },
                },
                xaxis: {
                    categories: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'],
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: false
                    }
                },
                legend: {
                    show: false
                },
            },
            series: [
                {
                    name: 'Nord',
                    data: [0, 150, 60, 180, 90, 75, 30] // Nombre de personnes ayant besoin de sang dans le Nord
                },
                {
                    name: 'Centre',
                    data: [0, 45, 150, 36, 60, 240, 30] // Nombre de personnes ayant besoin de sang dans le Centre
                },
                {
                    name: 'Sud',
                    data: [0, 15, 195, 21, 360, 120, 30] // Nombre de personnes ayant besoin de sang dans le Sud
                }
            ],
        }
    }
    render() {
        return (
            <React.Fragment>
                <Card>
                    <CardBody>
                        <h4 className="card-title mb-4">Distribution Géographique des Besoins en Sang en Tunisie (2024)</h4>

                        <Row className="text-center mt-4">
                            <Col xs="4">
                                <h5 className="font-size-20">89425</h5>
                                <p className="text-muted">Nord</p>
                            </Col>
                            <Col xs="4">
                                <h5 className="font-size-20">56210</h5>
                                <p className="text-muted">Centre</p>
                            </Col>
                            <Col xs="4">
                                <h5 className="font-size-20">8974</h5>
                                <p className="text-muted">Sud</p>
                            </Col>
                        </Row>

                        <div id="geographic-blood-chart" className="morris-charts morris-charts-height" dir="ltr">
                            <ReactApexChart options={this.state.options} series={this.state.series} type="area" height="300" />
                        </div>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

export default DistributionBesoinSang;
