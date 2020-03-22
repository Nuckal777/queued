import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Table } from 'react-bootstrap'
import UserContext from "../context/UserContext";
import queryString  from "query-string";
import moment from 'moment';


class Overview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            result: null,
            error: null
        }
    }

    componentDidMount() {
        const { userId } = this.props;
        const params = { UserID: userId };
        const stringified = queryString.stringify(params);

        const result = {
            "bookings": [
                {
                    "BookingID": 5934,
                    "Startdate": 1584880499,
                    "StoreName": "Der Laden"
                },
                {
                    "BookingID": 7963,
                    "Startdate": 1584880536,
                    "StoreName": "Der Betrieb"
                }
            ]
        };


        this.setState({
            isLoading: false,
            result
        });
    }

    render() {
        const { isLoading, result, error } = this.state;

        if (isLoading) {
            return  <div>Loading...</div>;
        }

        if (error) {
            return <div>Error</div>
        }

        if (result) {
            const { bookings } = result;
            return (
                <Table>
                    <thead>
                    <tr>
                        <th>Einkaufs-ID</th>
                        <th>Laden</th>
                        <th>Datum</th>
                        <th>Termin absagen</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        bookings.map((entry) => {
                            return <tr key={entry.BookingID}>
                                <td>{entry.BookingID}</td>
                                <td>{entry.StoreName}</td>
                                <td>{moment.unix(entry.Startdate).format("DD.MM.YYYY hh:mm")}</td>
                                <td><Button variant="danger">X</Button></td>
                            </tr>
                        })
                    }
                    </tbody>
                </Table>
            );
        }
    }
}

Overview.propTypes = {
    result: PropTypes.arrayOf(PropTypes.shape({
        purchaseID: PropTypes.string.isRequired,
        startDate: PropTypes.number.isRequired
    }))
};

const OverviewWithUserContext = () => (
    <UserContext.Consumer>
        {
            (userId) => <Overview userId={userId}  />
        }
    </UserContext.Consumer>
)


export default OverviewWithUserContext;
