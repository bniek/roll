import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';


function ManufacturerForm() {
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.name = name;

    const url = 'http://localhost:8100/api/manufacturers/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const newManufacturer = await response.json();

      setName();
      navigate('/manufacturers/');

    }
  }


  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create new manufacturer</h1>
          <form onSubmit={handleSubmit} id="create-hat-form">
            <div className="form-floating mb-3">
              <input onChange={handleNameChange} value={name} placeholder="Manufacturer name" required type="text" name="name" id="name" className="form-control" />
              <label htmlFor="manufacturer">Manufacturer</label>
            </div>
            <button className="btn btn-primary">Create manufacturer</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ManufacturerForm;
