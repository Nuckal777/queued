import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Button } from "react-bootstrap";

const BookingFormError = ({ handleReset }) => {
    return <div>
        <Alert variant="danger">Leider ist eswas schief gelaufen.</Alert>
        <Button variant="secondary" onClick={handleReset} >Erneut versuchen</Button>
    </div>
}

BookingFormError.propTypes = {
    handleReset: PropTypes.func.isRequired
}

export default BookingFormError;
