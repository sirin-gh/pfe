import React, { Component } from 'react';
import { Row, Col, Card, CardBody } from "reactstrap";
import ReactApexChart from 'react-apexcharts';

class SourcesDeDonDeSang extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                colors: ['#28bbe3', '#F0F1F4'],
                chart: {
                    stacked: true,
                    toolbar: {
                        show: false,
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                plotOptions: {
                    bar: {
                        columnWidth: '70%',
                    },
                },
                grid: {
                    borderColor: '#f8f8fa',
                    row: {
                        colors: ['transparent', 'transparent'],
                        opacity: 0.5
                    },
                },

                xaxis: {
                    categories: ['Collectes Mobiles', 'Cliniques'], // Sources de don de sang
                    labels: {
                        formatter: function (val) {
                            return val
                        },
                    },
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: false
                    }
                },
                yaxis: {
                    title: {
                        text: 'Nombre de Dons'
                    },
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return val
                        }
                    }
                },
                fill: {
                    opacity: 1
                },

                legend: {
                    show: false,
                    position: 'top',
                    horizontalAlign: 'left',
                    offsetX: 40
                }
            },
            series: [{
                name: 'Nombre de Dons',
                data: [120, 90] // Nombre de dons pour chaque source
            }],
        }
    }
    render() {
        return (
            <React.Fragment>
                <Card>
                    <CardBody>
                        <h4 className="card-title mb-4">Sources de Don de Sang</h4>

                        <Row className="text-center mt-4">
                            <Col xs="6">
                                <h5 className="font-size-20">120</h5>
                                <p className="text-muted">Collectes Mobiles</p>
                            </Col>
                            <Col xs="6">
                                <h5 className="font-size-20">90</h5>
                                <p className="text-muted">Cliniques</p>
                            </Col>
                        </Row>

                        <div id="blood-donation-chart" className="morris-charts morris-charts-height" dir="ltr">
                            <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height="290" />
                        </div>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

export default SourcesDeDonDeSang;
