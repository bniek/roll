import React, { useState } from "react";
import { Link } from 'react-router-dom';


function AppointmentsList(props) {
    const [filterVin, setFilterVin] = useState("");

    async function deleteAppointment(id) {
        const deleteUrl = `http://localhost:8080/api/appointments/${id}`
        const deleteResponse = await fetch(deleteUrl, {method: 'delete'})
        if (deleteResponse.ok) {
            console.log('Deleted')
        }
    }

    const filteredAppointments = props.appointments?.filter(appointment => {
        return appointment.vin.includes(filterVin);
    });

    return(
        <div>
            <h1 style={{ marginTop: '20px' }}>All Appointments</h1>
            <form className="d-flex" style={{ margin: '10px' }}>
                <input className="form-control me-2" type="search" placeholder="Search VIN" aria-label="Search"
                    value={filterVin} onChange={(e) => setFilterVin(e.target.value)}/>

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
                        <th scope="col">VIP Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAppointments?.map(appointment => {
                        return (
                            <tr key={appointment.vin}>
                                <td>{appointment.vin}</td>
                                <td>{appointment.owner_name}</td>
                                <td>{appointment.date}</td>
                                <td>{appointment.time}</td>
                                <td>{appointment.technician}</td>
                                <td>{appointment.reason}</td>
                                <td>{appointment.vip}</td>
                                <td>{appointment.completed}</td>
                                <td>
                                    <button onClick={() => deleteAppointment(appointment.id)} type="button" className="btn btn-outline-success btn-sm">Completed</button>
                                    <button onClick={() => deleteAppointment(appointment.id)} type="button" className="btn btn-outline-secondary btn-sm">Cancel</button>
                                </td>
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

export default AppointmentsList;
