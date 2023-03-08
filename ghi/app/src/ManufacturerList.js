
import React from "react";
import { Link } from 'react-router-dom';


function ManufacturerList(props) {
    return(
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Manufacturer Name</th>
                    </tr>
                </thead>
                <tbody>
                    {props.manufacturers?.map(manufacturer => {
                        return (
                            <tr key={manufacturer.id}>
                                <td>{manufacturer.name}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="col text-center">
                <Link to="/manufacturers/new" className="btn btn-outline-primary btn-sm px-4 gap-3">Add a manufacturer</Link>
            </div>
        </div>
      );
    }

export default ManufacturerList;
