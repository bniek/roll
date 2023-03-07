import React from "react";
import { useNavigate } from "react-router-dom";

function VehicleModelList(props) {
    let navigate = useNavigate();
const redirect = () =>{
  let redirectUrl = `/models/new`;
  navigate(redirectUrl);
}
    return (
        <div>
        <div></div>
        <button className="btn btn-primary" onClick={redirect}>Add a vehicle model</button>
            <table className= "table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th  scope="col">Image</th>
                        <th scope="col">Manufacturer</th>
                    </tr>
                </thead>
                <tbody>
                    {props.models?.map(model => {
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
        </div>
    );
}

export default VehicleModelList;
