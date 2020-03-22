import React from "react";
import { Form, Button, Alert } from 'react-bootstrap';
import StoreSelector from "./controls/StoreSelector";
import DateSelector from "./controls/DateSelector";
import moment from 'moment';
import FormSubmissionHandler from "./FormSubmissionHandler";
import PropTypes from 'prop-types';

const Booking = (props) => {
        const [selectedStore, setSelectedStore] = React.useState(null)
        const [selectedDate, setSelectedDate] = React.useState(moment());
        const { userId } = props;

        const reset = () => {
            setSelectedStore(null);
            setSelectedDate(moment());
        }

        return (
            <FormSubmissionHandler reset={reset}>
                    {
                            (submit) => (
                                <Form>
                                    <StoreSelector onSelect={setSelectedStore}/>
                                    {
                                            selectedStore &&
                                            <>
                                                    {
                                                            selectedStore.Status &&
                                                            <Alert variant={"warning"}>{selectedStore.Status}</Alert>
                                                    }
                                                    <DateSelector key={selectedStore.StoreID}
                                                                  selectedDate={selectedDate}
                                                                  onSelect={setSelectedDate}/>
                                            </>
                                    }
                                    {(selectedStore && selectedDate) &&
                                    <Button type="button" variant="secondary" onClick={() => submit(selectedDate, selectedStore, userId)}>Jetzt buchen</Button>
                                    }
                            </Form>
                            )
                    }
            </FormSubmissionHandler>
        )
}

Booking.propTypes = {
    userId: PropTypes.string.isRequired
}

export default Booking;
