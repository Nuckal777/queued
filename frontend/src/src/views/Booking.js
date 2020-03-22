import React from "react";
import BookingForm from '../forms/BookingForm'
import UserContext from "../context/UserContext";

const Booking = () => {
    return (
        <UserContext.Consumer>
            {
                (userId) => <BookingForm userId={userId}  />
            }

        </UserContext.Consumer>
        );
}

export default Booking;
