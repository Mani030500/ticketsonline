import React from 'react';
import './EventList.css'; // Import component-specific styles

function EventList({ events, onSelectEvent }) {
    return (
        <div className="event-list-container">
            <h2>Upcoming Events</h2>
            <ul>
                {events.map(event => (
                    <li key={event.id} onClick={() => onSelectEvent(event)} className="event-item">
                        <h3>{event.name}</h3>
                        <p>{new Date(event.date).toLocaleDateString()} - {event.time}</p>
                        <button>View Details & Book</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EventList;