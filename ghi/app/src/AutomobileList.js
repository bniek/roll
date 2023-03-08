import React from "react";
import { Link } from 'react-router-dom';


function AutomobileList(props) {
    return(
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">VIN</th>
                        <th scope="col">Color</th>
                        <th scope="col">Year</th>
                        <th scope="col">Model</th>
                        <th scope="col">Manufacturer</th>
                    </tr>
                </thead>
                <tbody>
                    {props.automobiles?.map(automobile => {
                        return (
                            <tr key={automobile.id}>
                                <td>{automobile.vin}</td>
                                <td>{automobile.color}</td>
                                <td>{automobile.year}</td>
                                <td>{automobile.model.name}</td>
                                <td>{automobile.model.manufacturer.name}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="col text-center">
                <Link to="/automobiles/new" className="btn btn-outline-primary btn-sm px-4 gap-3">Add automobile to inventory</Link>
            </div>
        </div>
      );
    }

export default AutomobileList;
