import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Card } from "react-bootstrap";
import moment from 'moment';

const BookingFormSuccess = ({ handleReset, result }) => {
    const { booking } = result;
    return (
        <div>
            <Alert variant="success">Deine Reservierung war erfolgreich.</Alert>
            <div style={{ padding: "30px 0"}}>
                <p>Hier ist Deine Reservierung:</p>

                <Card>
                    <Card.Body>
                        <Card.Title>{booking.StoreName} am {moment.unix(booking.Startdate).format('YYYY-MM-DD HH:mm')}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Id: {booking.BookingID} </Card.Subtitle>
                        <Card.Text>
                            Was es sonst noch so zu wissen gibt. Bitte folge diesen Hinweisen.
                        </Card.Text>
                        <Card.Link href="#">Webseite des Ladens</Card.Link>
                        <Card.Link href="#">Rückgangig machen</Card.Link>
                    </Card.Body>
                </Card>
            </div>

            <Button variant="secondary" onClick={handleReset} >Neue Reservierung</Button>
        </div>
    )
}

BookingFormSuccess.propTypes = {
    handleReset: PropTypes.func.isRequired,
    result: PropTypes.object.isRequired
}

export default BookingFormSuccess;
