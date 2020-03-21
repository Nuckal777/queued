import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Button, Table } from 'react-bootstrap'

const Overview = (props) => {
    const { data } = props;
    return (
        <Table>
            <thead>
                <tr>
                    <th>Einkaufs-ID</th>
                    <th>Datum</th>
                    <th>Uhrzeit</th>
                    <th>Termin absagen</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((entry) => {
                        const date = new Date(entry.startDate);
                        return <tr>
                            <td>{entry.purchaseID}</td>
                            <td><Moment format="DD.MM.YYYY">{date}</Moment></td>
                            <td><Moment format="hh:mm">{date}</Moment></td>
                            <td><Button variant="danger">X</Button></td>
                        </tr>
                    })
                }
            </tbody>
        </Table>
    );
}

Overview.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        purchaseID: PropTypes.string.isRequired,
        startDate: PropTypes.number.isRequired
    }))
};

export default Overview;
