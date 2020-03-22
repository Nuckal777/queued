import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookingFormSuccess from "./BookingFormSuccess";
import BookingFormError from "./BookingFormError";

const initialState = {
    isSubmitting: false,
    result: null,
    error: null
};

class FormSubmissionHandler extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.reset = this.reset.bind(this);
        this.state = initialState;
    }

    reset() {
        const { reset } = this.props;
        reset();
        this.setState(initialState);
    }

    handleSubmit(selectedDate, selectedStore, userId) {
        this.setState({ isSubmitting: true });

        const formData = JSON.stringify({
            Startdate: selectedDate.unix(),
            StoreID: selectedStore.StoreID,
            UserID: userId,

        });
        fetch("api/booking",
            {
                body: formData,
                method: "post"
            })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isSubmitting: false,
                        result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isSubmitting: false,
                        error
                    });
                }
            )
    }

    render() {
        const { children } = this.props;
        const { isSubmitting, result, error } = this.state;
        if (isSubmitting) {
            return <div>Submitting...</div>;
        }
        if (result) {
            return <BookingFormSuccess handleReset={this.reset} result={result} />
        }
        if (error) {
            return <BookingFormError handleReset={this.reset}/>
        }
        return children(this.handleSubmit);
    }
}

FormSubmissionHandler.propTypes = {
    children: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
}

export default FormSubmissionHandler;
