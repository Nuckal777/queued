import React from "react";
import { Form } from 'react-bootstrap';
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
                <Form.Label>Tag auswählen</Form.Label>
                <DateSelector />
            </Form.Group>
        </Form>
    );
}

export default Booking;
