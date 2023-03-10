import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';


function AppointmentForm() {
    const navigate = useNavigate();
    const [technicians, setTechnicians] = useState([]);
    const [vin, setVin] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [reason, setReason] = useState('');
    const [technician, setTechnician] = useState('');


    const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value);
    }

    const handleOwnerNameChange = (event) => {
        const value = event.target.value;
        setOwnerName(value);
    }

    const handleDateChange = (event) => {
        const value = event.target.value;
        setDate(value);
    }

    const handleTimeChange = (event) => {
        const value = event.target.value;
        setTime(value);
    }

    const handleReasonChange = (event) => {
        const value = event.target.value;
        setReason(value);
    }

    const handleTechnicianChange = (event) => {
        const value = event.target.value;
        setTechnician(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};

        data.vin = vin;
        data.owner_name = ownerName;
        data.date = date;
        data.time = time;
        data.reason = reason;
        data.technician = technician;
        console.log(data);

        const appointmentUrl = "http://localhost:8080/api/appointments/"

        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const response = await fetch(appointmentUrl, fetchConfig);

        if (response.ok) {
            const newAppointment = await response.json();
            console.log(newAppointment);
            setVin('');
            setOwnerName('');
            setDate('');
            setTime('');
            setReason('');
            setTechnician('');
            navigate('/appointments/');

        }

    }

    const fetchData = async () => {
        const technicianUrl = "http://localhost:8080/api/technicians"

        const response = await fetch(technicianUrl);

        if (response.ok) {
            const data = await response.json()
            setTechnicians(data.technicians)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new Service Appointment</h1>
                    <form onSubmit={handleSubmit} id="create-service-appointment-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleVinChange} value={vin} placeholder="VIN" required type="text" name="vin" id="vin" className="form-control" />
                            <label htmlFor="vin">VIN</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleOwnerNameChange} value={ownerName} placeholder="First Last" required type="text" name="ownerName" id="ownerName" className="form-control" />
                            <label htmlFor="ownerName">Customer name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleDateChange} value={date} placeholder="Date" required type="date" name="date" id="date" className="form-control" />
                            <label htmlFor="date">Date</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleTimeChange} value={time} placeholder="Time" required type="time" name="time" id="time" className="form-control" />
                            <label htmlFor="time">Time</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleReasonChange} value={reason} placeholder="Reason" required type="reason" name="reason" id="reason" className="form-control" />
                            <label htmlFor="reason">Reason</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleTechnicianChange} value={technician} required name="technician" id="technician" className="form-select">
                            <option value="">Choose technician</option>
                            {technicians.map(technician => {
                                return (
                                    <option key={technician.id} value={technician.technician_name}>
                                        {technician.technician_name}
                                    </option>
                                )
                            })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AppointmentForm;
