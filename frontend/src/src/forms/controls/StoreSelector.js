import React from 'react';
import { Form } from "react-bootstrap";

const StoreSelector = () => {

    return (
        <Form.Control as="select" value={0}>
            <option value={0} disabled>Bitte auswählen...</option>
            <option value={1}>Markt 1</option>
            <option value={2}>Makrt 2</option>
            <option value={3}>Markt 3</option>
        </Form.Control>
    )

}

export default StoreSelector;
