import React from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Form } from "react-bootstrap";
import _random from 'lodash/random';

class Capacity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
        this.checkCapacity = this.checkCapacity.bind(this);
    }

    checkCapacity(selectedDate) {
        this.setState({
            error: null,
            isLoaded: false,
            items: []
        });

        // make request for selected date
        fetch("/api/capacity")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { selectedDate } = this.props;
        if (prevProps.selectedDate !== selectedDate) {
            this.checkCapacity(selectedDate);
        }
    }

    componentDidMount() {
        const { selectedDate } = this.props;
        this.checkCapacity(selectedDate);
    }

    render() {
        const { error, isLoaded, items } = this.state;
        const { selectedDate } = this.props;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            let amount = -1;
            for (var item of items.capacity) {
                if (moment(item.Timeslot).unix() === selectedDate.unix()) {
                    amount = item.Amount;
                }
            }
            if (amount === -1) {
                // return ramdon for showcase
                const randomAmount = _random(0,15);
                return <div>{randomAmount} geplante Besuche.</div>;
            }
            return <div>{amount} geplante Besuche.</div>;
        }
    }
}

Capacity.propTypes = {
    selectedDate: PropTypes.object.isRequired
}

class DateSelector extends React.Component {
    constructor(props) {
        super(props);
        this.onDateChanged = this.onDateChanged.bind(this);
    }

    onDateChanged(currentMoment) {
        const { onSelect } = this.props;
        onSelect(currentMoment);
    }

    render() {
        const { selectedDate } = this.props;
        return (
            <Form.Group controlId="bookingForm.store">
                <Form.Label>Tag auswählen</Form.Label>
                <Datetime open input={false} value={selectedDate} onChange={this.onDateChanged}></Datetime><Capacity selectedDate={selectedDate}></Capacity>
            </Form.Group>
        );
    }
}

DateSelector.propTypes = {
    onSelect: PropTypes.func.isRequired,
    selectedDate: PropTypes.object.isRequired
}

export default DateSelector;
