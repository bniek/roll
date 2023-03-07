import React from "react";

function VehicleModelList(props) {
    console.log(props)
    return (
        <div>
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
