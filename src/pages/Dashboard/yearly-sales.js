import React, { Component } from 'react';
import { Row, Col, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import ReactApexChart from 'react-apexcharts';

class YearlySales extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    toolbar: {
                        show: false,
                    },
                },
                colors: ['#7A6FBE', '#28BBE3'],
                plotOptions: {
                    bar: {
                        columnWidth: '70%',
                        dataLabels: {
                            show: false
                        },

                    },
                },
                legend: {
                    show: false
                },
                dataLabels: {
                    enabled: false,
                },
                grid: {
                    show: false,
                    row: {
                        colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
                xaxis: {
                    labels: {
                        show: false
                    },
                    categories: [],
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: false
                    }
                },
                yaxis: {
                    labels: {
                        show: false
                    },
                },
            },
            series: [{
                name: 'Series A',
                data: [8, 6, 4, 7, 10, 12, 7, 4, 9, 12, 13, 11, 12]
            },],
        }
    }
    render() {
        return (
            <React.Fragment>
                <Card>
                    <CardBody>
                        <h4 className="card-title mb-4">Argent du sang collecté annuellement</h4>
                        <Row>
                            <Col md="4">
                                <div>
                                    <h3>520,345 DT</h3>
                                    <p className="text-muted">"Le don de la vie, un don à la fois."</p>
                                    <Link to="#" className="text-primary">Plus<i className="mdi mdi-chevron-double-right"></i></Link>
                                </div>
                            </Col>
                            <Col md="8" className="text-end">
                                <div id="sparkline">
                                    <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height="130" className="apex-charts" />
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

export default YearlySales;