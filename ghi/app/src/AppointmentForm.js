import React, {useEffect, useState} from 'react';

function AppointmentForm() {
    const [technicians, setTechnicians] = useState([]);
    const fetchData = async () => {
      const url = 'http://localhost:8080/api/technicians/';
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setTechnicians(data.technicians)
      }
    }


  const [vin, setVin] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');
  const [vip, setVip] = useState('');
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
    data.vip = vip;
    data.technician = technician;

    const url = 'http://localhost:8080/api/appointments/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const newAppointment = await response.json();
      console.log(newAppointment);

      setVin('');
      setOwnerName('');
      setDate('');
      setTime('');
      setReason('');
      setVip('');
      setTechnician('');

    }
  }

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create appointment</h1>
          <form onSubmit={handleSubmit} id="create-hat-form">
            <div className="form-floating mb-3">
              <input onChange={handleVinChange} value={vin} placeholder="VIN" required type="text" name="vin" id="vin" className="form-control" />
              <label htmlFor="vin">VIN</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleOwnerNameChange} value={ownerName} placeholder="Customer name" required type="text" name="owner_name" id="owner_name" className="form-control" />
              <label htmlFor="year">Year</label>
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
              <input onChange={handleReasonChange} value={reason} placeholder="reason" required type="text" name="reason" id="reason" className="form-control" />
              <label htmlFor="reason">Reason</label>
            </div>
            {/* <div className="mb-3">
                <select value={vip} onChange={handleVipChange} required id="vip" name="vip" className="form-select">
                  <option value="">VIP status</option>
                  <option value="1">True</option>
                  <option value="2">False</option>
                </select>
              </div> */}
            <div className="mb-3">
                <select value={technician} onChange={handleTechnicianChange} required id="technician" name="technician" className="form-select">
                  <option value="">Choose a technician</option>
                  {technicians.map(technician => {
                    return (
                    <option key={technician.id} value={technician.id}>
                        {technician.technician_name}
                    </option>
                    );
                })}
                </select>
              </div>
            <button className="btn btn-primary">Create appointment</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AppointmentForm;
