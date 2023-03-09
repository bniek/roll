import React, { useState, useEffect} from "react";
import { Link } from 'react-router-dom';


function AppointmentHistory() {
    const [appointments, setAppointments] = useState([]);
    const [filterVin, setFilterVin] = useState('');

    const filteredAppointments = appointments?.filter(appointment => {
        return appointment.vin.includes(filterVin) && appointment.completed;
    });

    const fetchData = async () => {
      const url = 'http://localhost:8080/api/appointments/';
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setAppointments(data.appointments)
      }
    }

    useEffect(() => {
        fetchData();
    }, []);


    return(
        <div>
            <h1 style={{ marginTop: '20px' }}>Past Appointments</h1>

            <form className="d-flex" style={{ margin: '10px' }}>
                <input value={filterVin} onChange={(e) => setFilterVin(e.target.value)} className="form-control me-2" type="search" placeholder="Search by VIN" aria-label="Search past appointments by VIN" />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>


            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">VIN</th>
                        <th scope="col">Customer name</th>
                        <th scope="col">Date</th>
                        <th scope="col">Time</th>
                        <th scope="col">Technician</th>
                        <th scope="col">Reason</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {appointments.filter(appointment => appointment.completed)?.map(appointment => { */}
                    {filteredAppointments.map(appointment => {
                        return (
                            <tr key={appointment.vin}>
                                <td>{appointment.vin}</td>
                                <td>{appointment.owner_name}</td>
                                <td>{appointment.date}</td>
                                <td>{appointment.time}</td>
                                <td>{appointment.technician}</td>
                                <td>{appointment.reason}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="col text-center">
                <Link to="/appointments/new" className="btn btn-outline-primary btn-sm px-4 gap-3">Make a new appointment</Link>
            </div>
        </div>
    );
}

export default AppointmentHistory;
