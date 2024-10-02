
// import modules and dependencies
import {v4 as Id} from "uuid"

const flights = [
    {
        id: Id(),
        from: "Brussels",
        to: "Boston",
        date: "2025-06-01",
        price: 500,
        company: "AirFrance"
    },
    {
        id: Id(),
        from: "Brussels",
        to: "Singapore",
        date: "2025-04-10",
        price: 700,
        company: "AirFrance"
    }
]

class Flights {
    static getAllFlights() {
        return flights;
    }
    static getFlightById() {
        return flights.find((flight) => flight.id === Id);
    }
    static addFlight(flight) {
        const newFlight = {
            id: Id, 
            ...flight
        }
        flights.unshift(newFlight)
        return newFlight
    }
}

export default Flights;