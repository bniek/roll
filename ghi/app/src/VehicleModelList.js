import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

function VehicleModelList() {
    const [models, setModels] = useState([]);

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/models/';
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          setModels(data.models)
        }
      }

      useEffect(() => {
          fetchData();
      }, []);


    let navigate = useNavigate();
    const redirect = () =>{
    let redirectUrl = `/models/new`;
    navigate(redirectUrl);
    }
    return (
        <div>
        <div></div>
            <table className= "table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th  scope="col">Image</th>
                        <th scope="col">Manufacturer</th>
                    </tr>
                </thead>
                <tbody>
                    {models?.map(model => {
                        return (
                            <tr key={model.href}>
                                <td>{model.name}</td>
                                <td><img src={model.picture_url} width="200" height="150" alt="hat" /></td>
                                <td>{model.manufacturer.name}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="col text-center">
            <button className="btn btn-outline-primary btn-sm px-4 gap-3" onClick={redirect}>Add a vehicle model</button>
            </div>
        </div>
    );
}

export default VehicleModelList;
