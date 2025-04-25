import React from 'react';
import './EventDetails.css'; // Import component-specific styles

function EventDetails({ event, onSeatSelect, selectedSeats }) {
    const seats = Array.from({ length: event.totalSeats }, (_, i) => i + 1);

    const isSeatOccupied = (seatNumber) => event.occupiedSeats.includes(seatNumber);
    const isSeatSelected = (seatNumber) => selectedSeats.includes(seatNumber);

    return (
        <div className="event-details-container">
            <h2>{event.name}</h2>
            <p>Date: {new Date(event.date).toLocaleDateString()}</p>
            <p>Time: {event.time}</p>
            <p>Price: ₹{event.price}</p>

            <div className="seating-area">
                <h3>Select Seats</h3>
                <div className="seats-grid">
                    {seats.map(seatNumber => (
                        <div
                            key={seatNumber}
                            className={`seat ${isSeatOccupied(seatNumber) ? 'occupied' : ''} ${isSeatSelected(seatNumber) ? 'selected' : ''}`}
                            onClick={() => !isSeatOccupied(seatNumber) && onSeatSelect(seatNumber)}
                        >
                            {seatNumber}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default EventDetails;