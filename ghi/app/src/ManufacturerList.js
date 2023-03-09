
import React, { useState, useEffect} from "react";
import { Link } from 'react-router-dom';


function ManufacturerList(props) {
    const [manufacturers, setManufacturers] = useState([]);

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/manufacturers/';
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          setManufacturers(data.manufacturers)
        }
      }

      useEffect(() => {
          fetchData();
      }, []);



    return(
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Manufacturer Name</th>
                    </tr>
                </thead>
                <tbody>
                    {manufacturers?.map(manufacturer => {
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
