import React from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';

class Capacity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch("/capacity")
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

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            let amount = -1;
            for (var item of items.Capacity) {
                if (moment(item.StartDate).unix() === this.props.moment.unix()) {
                    amount = item.Amount;
                }
            }
            if (amount === -1) {
                return <div>Geplante Besuche nicht bekannt.</div>;
            }
            return <div>{amount} geplante Besuche</div>;
        }
    }
}

class CapacityDatime extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: moment()};
    }

    onDateChanged(currentMoment) {
        this.setState({date: currentMoment});
    }

    render() {
        return <><Datetime open input={false} onChange={this.onDateChanged.bind(this)}></Datetime><Capacity moment={this.state.date}></Capacity></>;
    }
}

const DateSelector = () => <CapacityDatime></CapacityDatime>

export default DateSelector;
