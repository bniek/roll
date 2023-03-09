import React, { useState, useEffect} from "react";
import { Link } from 'react-router-dom';


function AutomobileList() {
    const [automobiles, setAutomobiles] = useState([]);

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/automobiles/';
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          setAutomobiles(data.automobiles)
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
                        <th scope="col">VIN</th>
                        <th scope="col">Color</th>
                        <th scope="col">Year</th>
                        <th scope="col">Model</th>
                        <th scope="col">Manufacturer</th>
                    </tr>
                </thead>
                <tbody>
                    {automobiles?.map(automobile => {
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
