import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CustomerForm() {

    const [name, setName] = useState('');

    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }

    const [address, setAddress] = useState('');

    const handleAddressChange = (event) => {
        const value = event.target.value;
        setAddress(value);
    }

    const [phoneNumber, setPhoneNumber] = useState('');

    const handlePhoneNumberChange = (event) => {
        const value = event.target.value;
        setPhoneNumber(value);
    }

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.name = name;
        data.address = address;
        data.phone_number = phoneNumber;

        const customersUrl = 'http://localhost:8090/api/customers/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type':'application/json',
            }
        }

        const response = await fetch(customersUrl, fetchConfig);
        if(response.ok){
            const newCustomer = await response.json();

            setName('');
            setAddress('');
            setPhoneNumber('');
            navigate('/sales/')
            }

        }

    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a new Customer</h1>
            <form onSubmit={handleSubmit} id="create-sale-form">
            <div className="form-floating mb-3">
                <input onChange={handleNameChange} value={name} placeholder="Name" required type="text" name="name"  id="name" className="form-control"/>
                <label htmlFor="name">Name</label>
            </div>
            <div className="form-floating mb-3">
                <input onChange={handleAddressChange} value={address} placeholder="Address" required type="text" name="address"  id="address" className="form-control"/>
                <label htmlFor="address">Address</label>
            </div>
            <div className="form-floating mb-3">
                <input onChange={handlePhoneNumberChange} value={phoneNumber} placeholder="Phone Number" required type="text" name="phone number"  id="phone number" className="form-control"/>
                <label htmlFor="phone number">Phone Number</label>
            </div>
              <button className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
}

export default CustomerForm;
