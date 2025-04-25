import React, { useState } from 'react';
import EventList from './components/EventList';
import EventDetails from './components/EventDetails';
import BookingSummary from './components/BookingSummary';
import './App.css'; // Import global styles

function App() {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [events, setEvents] = useState([
        { id: 1, name: 'GBU', date: new Date().toISOString().split('T')[0], time: '10.00 am', price: 200, totalSeats: 50, occupiedSeats: [5, 12, 28] },
        { id: 2, name: 'GBU', date: new Date().toISOString().split('T')[0], time: '12.30 pm', price: 150, totalSeats: 40, occupiedSeats: [10, 25] },
        { id: 3, name: 'GBU', date: new Date().toISOString().split('T')[0], time: '4.00 pm', price: 180, totalSeats: 60, occupiedSeats: [15, 35, 42] },
        { id: 3, name: 'GBU', date: new Date().toISOString().split('T')[0], time: '8.30 pm', price: 180, totalSeats: 60, occupiedSeats: [15, 35, 42] },
    ]);
    const [isBooked, setIsBooked] = useState(false); // Track if tickets are booked
    const [showPayment, setShowPayment] = useState(false); // Track if payment step is shown

    const handleDownloadTicket = () => {
        if (selectedEvent && selectedSeats.length > 0 && isBooked) {
            const ticketDetails = `
                Event: ${selectedEvent.name}
                Date: ${selectedEvent.date}
                Time: ${selectedEvent.time}
                Seats: ${selectedSeats.join(', ')}
                Total Price: ₹${selectedSeats.length * selectedEvent.price}
            `;

            const blob = new Blob([ticketDetails], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `Ticket_${selectedEvent.name.replace(/\s+/g, '_')}.txt`;
            link.click();
            URL.revokeObjectURL(url);
        } else {
            alert('Please book your tickets before downloading.');
        }
    };

    const handleSelectEvent = (event) => {
        setSelectedEvent(event);
        setSelectedSeats([]); // Reset selected seats when a new event is selected
        setIsBooked(false); // Reset booking status
        setShowPayment(false); // Reset payment step
    };

    const handleSeatSelect = (seatNumber) => {
        if (selectedSeats.includes(seatNumber)) {
            setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
        } else {
            setSelectedSeats([...selectedSeats, seatNumber]);
        }
    };

    const handleProceedToPayment = () => {
        if (selectedSeats.length > 0) {
            setShowPayment(true); // Show payment step
        } else {
            alert('Please select at least one seat to proceed to payment.');
        }
    };

    const handleConfirmPayment = () => {
        alert('Payment successful! Booking confirmed.');
        const updatedEvents = events.map(event =>
            event.id === selectedEvent.id
                ? { ...event, occupiedSeats: [...event.occupiedSeats, ...selectedSeats] }
                : event
        );
        setEvents(updatedEvents);
        setIsBooked(true); // Mark tickets as booked
        setShowPayment(false); // Hide payment step
    };

    return (
        <div className="app-container">
            <h1>Online Ticket Booking</h1>
            {!selectedEvent ? (
                <EventList events={events} onSelectEvent={handleSelectEvent} />
            ) : showPayment ? (
                <div className="payment-container">
                    <h2>Payment</h2>
                    <p>Total Amount: ₹{selectedSeats.length * selectedEvent.price}</p>
                    <button onClick={handleConfirmPayment}>Confirm Payment</button>
                    <button onClick={() => setShowPayment(false)}>Cancel</button>
                </div>
            ) : (
                <EventDetails
                    event={selectedEvent}
                    onSeatSelect={handleSeatSelect}
                    selectedSeats={selectedSeats}
                />
            )}

            {selectedSeats.length > 0 && selectedEvent && !showPayment && (
                <BookingSummary
                    selectedSeats={selectedSeats}
                    eventPrice={selectedEvent.price}
                    onBookTickets={handleProceedToPayment}
                />
            )}
            <button onClick={handleDownloadTicket} disabled={!isBooked}>
                Download Ticket
            </button>
        </div>
    );
}

export default App;