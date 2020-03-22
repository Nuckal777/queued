import React from "react";
import { Form, Button, Alert } from 'react-bootstrap';
import StoreSelector from "./controls/StoreSelector";
import DateSelector from "./controls/DateSelector";
import moment from 'moment';

const Booking = (props) => {
        const [selectedStore, setSelectedStore] = React.useState(null)
        const [selectedDate, setSelectedDate] = React.useState(moment());
        return (
            <Form>
                <StoreSelector onSelect={setSelectedStore} />
                {
                    selectedStore &&
                    <>
                            {
                                    selectedStore.Status &&
                                    <Alert variant={"warning"}>{selectedStore.Status}</Alert>
                            }
                            <DateSelector key={selectedStore.StoreID} selectedDate={selectedDate} onSelect={setSelectedDate}/>
                    </>
                }

                <Button disabled={!(selectedStore && selectedDate)} type="submit" variant="secondary">Jetzt buchen</Button>

            </Form>
        )
}

export default Booking;
