import React, { Component } from 'react';
import { Table, Card, CardBody, Button } from "reactstrap";

//Import Images
import user2 from "../../assets/images/users/user-2.jpg";
import user3 from "../../assets/images/users/user-3.jpg";
import user4 from "../../assets/images/users/user-4.jpg";
import user5 from "../../assets/images/users/user-5.jpg";
import user6 from "../../assets/images/users/user-6.jpg";

class LatestTransactions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: [
                { imgUrl: user2, name: "Donneur 1", status: "Donneur Recent", amount: "10L", date: "5/12/2016", color: "success" },
                { imgUrl: user3, name: "Donneur 2", status: "Rendez-vous à venir", amount: "8,541", date: "10/11/2016", color: "warning" },
                { imgUrl: user4, name: "Donneur 3", status: "Donneur Recent", amount: "954", date: "8/11/2016", color: "success" },
                { imgUrl: user5, name: "Donneur 4", status: "Priorité", amount: "44,584", date: "7/11/2016", color: "danger" },
                { imgUrl: user6, name: "Donneur 5", status: "Donneur Recent", amount: "8,844", date: "1/11/2016", color: "success" },
            ],
        }
    }

    render() {
        return (
            <React.Fragment>
                <Card>
                    <CardBody>
                        <h4 className="card-title mb-4">Les Donneurs De Sang</h4>

                        <div className="table-responsive">
                            <Table className="align-middle table-centered table-vertical table-nowrap">

                                <tbody>
                                    {
                                        this.state.transactions.map((transaction, key) =>
                                            <tr key={key}>
                                                <td>
                                                    <img src={transaction.imgUrl} alt="user" className="avatar-xs rounded-circle me-2" /> {transaction.name}
                                                </td>
                                                <td><i className={"mdi mdi-checkbox-blank-circle  text-" + transaction.color}></i> {transaction.status}</td>
                                                <td>
                                                    {transaction.amount}
                                                    <p className="m-0 text-muted font-size-14">Amount</p>
                                                </td>
                                                <td>
                                                    {transaction.date}
                                                    <p className="m-0 text-muted font-size-14">Date</p>
                                                </td>
                                                <td>
                                                    <Button color="secondary" size="sm" className="waves-effect waves-light">Editer</Button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

export default LatestTransactions;