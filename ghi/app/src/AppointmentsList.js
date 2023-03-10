import React, { useState, useEffect} from "react";
import { Link } from 'react-router-dom';


function AppointmentsList() {
    const [appointments, setAppointments] = useState([]);


    async function deleteAppointment(id) {
        const deleteUrl = `http://localhost:8080/api/appointments/${id}`
        const deleteResponse = await fetch(deleteUrl, {method: 'delete'})
        if (deleteResponse.ok) {
            console.log('Deleted')
        }
    }

    async function completeAppointment(id) {
        const completeUrl = `http://localhost:8080/api/appointments/${id}/`;
        const completeResponse = await fetch(completeUrl, {
            method: 'PUT',
            body: JSON.stringify({ completed: true }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (completeResponse.ok) {
            console.log('Completed');
            const updatedAppointments = appointments.map(appointment => {
                if (appointment.id === id) {
                    return {completed: true};
                }
                return appointment;
            });
            setAppointments(updatedAppointments);
        }
    }

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
            <h1 style={{ marginTop: '20px' }}>All Upcoming Appointments</h1>

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
                    {appointments.filter(appointment => !appointment.completed)?.map(appointment => {
                        return (
                            <tr key={appointment.vin}>
                                <td>{appointment.vin}</td>
                                <td>{appointment.owner_name}</td>
                                <td>{appointment.date}</td>
                                <td>{appointment.time}</td>
                                <td>{appointment.technician}</td>
                                <td>{appointment.reason}</td>
                                <td>{appointment.vip ? 'Yes' : 'No'}</td>
                                <td>
                                    <button onClick={() => completeAppointment(appointment.id)} type="button" className="btn btn-success btn-sm">Completed</button>
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
