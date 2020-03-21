import React from "react";
import { Form, Button } from 'react-bootstrap';
import StoreSelector from "./controls/StoreSelector";
import DateSelector from "./controls/DateSelector";

const Booking = (props) => {
    return (
        <Form>
            <Form.Group controlId="bookingForm.store">
                <Form.Label>Teilnehmende Märkte</Form.Label>
                <StoreSelector />
            </Form.Group>
            <Form.Group controlId="bookingForm.store">
                <Form.Label>Datum auswählen</Form.Label>
                <DateSelector />
            </Form.Group>
            <Button type="submit" variant="secondary">Jetzt buchen</Button>
        </Form>
    );
}

export default Booking;
