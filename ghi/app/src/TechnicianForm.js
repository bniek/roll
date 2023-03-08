import React, {useEffect, useState} from 'react';

function TechnicianForm() {
  const [technicianName, setTechnicianName] = useState('');
  const [employeeNumber, setEmployeeNumber] = useState('');

  const handleTechnicianNameChange = (event) => {
    const value = event.target.value;
    setTechnicianName(value);
  }

  const handleEmployeeNumberChange = (event) => {
    const value = event.target.value;
    setEmployeeNumber(value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.technician_name = technicianName;
    data.employee_number = employeeNumber;

    const url = 'http://localhost:8080/api/technicians/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const newTechnician = await response.json();
      console.log(newTechnician);

      setTechnicianName('');
      setEmployeeNumber('');

    }
  }


  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add Technician</h1>
          <form onSubmit={handleSubmit} id="create-hat-form">
            <div className="form-floating mb-3">
              <input onChange={handleTechnicianNameChange} value={technicianName} placeholder="Technician name" required type="text" name="technician_name" id="technician_name" className="form-control" />
              <label htmlFor="technician_name">Technician name</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleEmployeeNumberChange} value={employeeNumber} placeholder="Employee number" required type="text" name="employee_number" id="employee_number" className="form-control" />
              <label htmlFor="employee_number">Employee number</label>
            </div>
            <button className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default TechnicianForm;
