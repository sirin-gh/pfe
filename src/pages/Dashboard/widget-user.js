import React, { Component } from 'react';
import { Card } from "reactstrap";

//Import Images
import user2 from "../../assets/images/users/user-2.jpg";

class WidgetUser extends Component {

    render() {
        return (
            <React.Fragment>
                <Card className="widget-user">
                    <div className="widget-user-desc p-4 text-center bg-primary position-relative">
                        <i className="fas fa-quote-left h2 text-white-50"></i>
                        <p className="text-white mb-0">"Un seul don de sang peut contribuer à sauver jusqu'à trois vies. En donnant du sang, vous devenez un véritable héros pour quelqu'un dans le besoin."</p>
                    </div>
                    <div className="p-4">
                        <div className="float-start mt-2 me-3">
                            <img src={user2} alt="" className="rounded-circle avatar-sm" />
                        </div>
                        <h6 className="mb-1 font-size-16 mt-2">Nom De Manager</h6>
                        <p className="text-muted mb-0">Manager Des collectes de sang</p>
                    </div>
                </Card>
            </React.Fragment>
        );
    }
}

export default WidgetUser;