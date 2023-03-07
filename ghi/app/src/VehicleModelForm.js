import React, { useEffect, useState } from 'react';

function VehicleModelForm(props) {

    const [manufacturers, setManufacturers] = useState([]);

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/manufacturers/';
        const response = await fetch(url);

        if (response.ok){
            const data = await response.json();
            setManufacturers(data.manufacturers);
        }
        console.log(props)
    }

    const [name, setName] = useState('');

    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }

    const [pictureUrl, setPictureUrl] = useState('');

    const handlePictureUrlChange = (event) => {
        const value = event.target.value;
        setPictureUrl(value);
    }

    const [manufacturerId, setManufacturerId] = useState('');

    const handleManufacturerIdChange = (event) => {
        const value = event.target.value;
        setManufacturerId(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.name = name;
        data.picture_url = pictureUrl;
        data.manufacturer_id = manufacturerId;
        console.log(data);

        const vehicleModelUrl = 'http://localhost:8100/api/models/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type':'application/json',
            }
        }
        const response = await fetch(vehicleModelUrl, fetchConfig);
        if(response.ok){
            const newModel = await response.json();
            console.log(newModel);

            setName('');
            setPictureUrl('');
            setManufacturerId('');
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new Vehicle Model</h1>
            <form onSubmit={handleSubmit} id="create-vehicle-model-form">
              <div className="form-floating mb-3">
                <input onChange={handleNameChange} value={name} placeholder="Name" required type="text" name="name" id="name" className="form-control"/>
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handlePictureUrlChange} value={pictureUrl} placeholder="Picture URL" required type="url" name="picture_url"  id="picture_url" className="form-control"/>
                <label htmlFor="starts">Picture URL</label>
              </div>
              <div className="form-floating mb-3">
                <select onChange={handleManufacturerIdChange} value={manufacturerId} required name="manufacture id" id="manufacturer id" className="form-select">
                  <option value="">Choose a manufacturer</option>
                  {manufacturers.map(manufacturer => {
                    console.log(manufacturer.id)
                    console.log(manufacturer.name)
                    return (
                      <option key={manufacturer.href} value={manufacturer.id}>
                        {manufacturer.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
}

export default VehicleModelForm;
