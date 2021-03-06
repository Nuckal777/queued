import React, { Component } from 'react';
import { Form } from "react-bootstrap";
import PropTypes from 'prop-types';
import _find from 'lodash/find';

class StoreSelector extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: null,
            loading: true,
            error: null,
            selected: 0
        }
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(event) {
        const storeID = event.target.value;
        const {
            onSelect
        } = this.props;
        const { data } = this.state;
        const selectedStore = _find(data.storelist, (store) => parseInt(store.StoreID, 10) === parseInt(storeID, 10));
        this.setState({
            selected: storeID
        })
        onSelect(selectedStore);
    }

    componentDidMount() {
            fetch('/api/storelist')
                .then(response => response.json())
                .then(data => this.setState({ data, loading: false }));
    }

    render() {

        const { loading, data, error, selected } = this.state;

        if (loading) {
            return <div>Loading</div>
        }

        if (data) {
            return (
                <Form.Group controlId="bookingForm.store">
                    <Form.Label>Teilnehmende Märkte</Form.Label>
                    <Form.Control as="select" value={selected} onChange={this.handleSelect} >
                        <option value={0} disabled>Bitte auswählen...</option>
                        {
                            data.storelist.map(row => {
                                return <option key={row.StoreID} value={row.StoreID}>{row.Name} ({row.Type})</option>
                            })
                        }
                    </Form.Control>
                </Form.Group>
            )
        }

        if (error) {
            return <div>Error</div>
        }
}
}

StoreSelector.propTypes = {
    onSelect: PropTypes.func.isRequired
}

export default StoreSelector;
