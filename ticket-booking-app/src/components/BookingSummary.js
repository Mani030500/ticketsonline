import React from 'react';
import './BookingSummary.css'; // Import component-specific styles

function BookingSummary({ selectedSeats, eventPrice, onBookTickets }) {
    const totalPrice = selectedSeats.length * eventPrice;

    return (
        <div className="booking-summary-container">
            <h2>Booking Summary</h2>
            <p>Selected Seats: {selectedSeats.join(', ')}</p>
            <p>Total Price: ₹{totalPrice}</p>
            <button onClick={onBookTickets}>Book Tickets</button>
        </div>
    );
}

export default BookingSummary;