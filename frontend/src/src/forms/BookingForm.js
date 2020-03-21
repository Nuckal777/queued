import React, { Component } from "react";
import { Form, Button, Alert } from 'react-bootstrap';
import StoreSelector from "./controls/StoreSelector";
import DateSelector from "./controls/DateSelector";

const Booking = (props) => {

        const [selectedStore, setSelectedStore] = React.useState(null)
        const [selectedDate, setSelectedDate] = React.useState(null)
        return (<Form>
                <StoreSelector onSelect={setSelectedStore} />
            {

                selectedStore &&
                <>
                        {
                                selectedStore.Status &&
                                    <Alert variant={"warning"}>{selectedStore.Status}</Alert>
                        }
                        <Form.Group controlId="bookingForm.store">
                            <Form.Label>Tag auswählen</Form.Label>
                            <DateSelector/>
                        </Form.Group>
                </>
            }

            <Button disabled={!(selectedStore && selectedDate)} type="submit" variant="secondary">Jetzt buchen</Button>

        </Form>)
}

export default Booking;
