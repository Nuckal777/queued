import React, { Component } from "react";
import { Form } from 'react-bootstrap';
import StoreSelector from "./controls/StoreSelector";
import DateSelector from "./controls/DateSelector";

const Booking = (props) => {

        const [selectedStore, setSelectedStore] = React.useState(null)
        return (<Form>
                <StoreSelector onSelect={setSelectedStore} />
            {

                selectedStore &&
                <Form.Group controlId="bookingForm.store">
                    <Form.Label>Tag auswählen</Form.Label>
                    <DateSelector/>
                </Form.Group>
            }
        </Form>)
}

export default Booking;
