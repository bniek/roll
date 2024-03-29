import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';


function AutomobileForm() {
  const navigate = useNavigate();
  const [models, setModels] = useState([]);
  const [color, setColor] = useState('');
  const [year, setYear] = useState('');
  const [vin, setVin] = useState('');
  const [model, setModel] = useState('');



  const handleColorChange = (event) => {
    const value = event.target.value;
    setColor(value);
  }

  const handleYearChange = (event) => {
    const value = event.target.value;
    setYear(value);
  }

  const handleVinChange = (event) => {
    const value = event.target.value;
    setVin(value);
  }

  const handleModelChange = (event) => {
    const value = event.target.value;
    setModel(value);
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};

    data.color = color;
    data.year = year;
    data.vin = vin;
    data.model_id = model;

    const url = 'http://localhost:8100/api/automobiles/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const newAutomobile = await response.json();

      setColor('');
      setYear('');
      setVin('');
      setModel('');
      navigate('/automobiles/');


    }
  }

  const fetchData = async () => {
    const modelUrl = 'http://localhost:8100/api/models/';
    const modelResponse = await fetch(modelUrl);
    if (modelResponse.ok) {
      const modelData = await modelResponse.json();
      setModels(modelData.models)
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add an automobile to inventory</h1>
          <form onSubmit={handleSubmit} id="create-hat-form">
            <div className="form-floating mb-3">
              <input onChange={handleColorChange} value={color} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
              <label htmlFor="color">Color</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleYearChange} value={year} placeholder="Year" required type="text" name="year" id="year" className="form-control" />
              <label htmlFor="year">Year</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleVinChange} value={vin} placeholder="VIN" required type="text" name="vin" id="vin" className="form-control" />
              <label htmlFor="year">VIN</label>
            </div>
            <div className="mb-3">
                <select value={model} onChange={handleModelChange} required id="model" name="model" className="form-select">
                  <option value="">Choose a model</option>
                  {models.map(model => {
                    return (
                    <option key={model.id} value={model.id}>
                        {model.name}
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
  )
}

export default AutomobileForm;
