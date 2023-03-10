import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SalesPersonForm(props) {

    const [name, setName] = useState('');

    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }

    const [employeeNumber, setEmployeeNumber] = useState('');

    const handleEmployeeNumberChange = (event) => {
        const value = event.target.value;
        setEmployeeNumber(value);
    }

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.name = name;
        data.employee_number = employeeNumber;


        const salesUrl = 'http://localhost:8090/api/salespeople/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type':'application/json',
            }
        }

        const response = await fetch(salesUrl, fetchConfig);
        if(response.ok){
            const newSalesPerson = await response.json();

            setName('');
            setEmployeeNumber('');
            navigate('/salespeople/history/')
            }

        }

    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a new Sales Person</h1>
            <form onSubmit={handleSubmit} id="create-sale-form">
            <div className="form-floating mb-3">
                <input onChange={handleNameChange} value={name} placeholder="Name" required type="text" name="name"  id="name" className="form-control"/>
                <label htmlFor="name">Name</label>
            </div>
            <div className="form-floating mb-3">
                <input onChange={handleEmployeeNumberChange} value={employeeNumber} placeholder="Employee number" required type="text" name="employee number"  id="employee number" className="form-control"/>
                <label htmlFor="employee number">Employee Number</label>
            </div>
              <button className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
}

export default SalesPersonForm;
