import React, { useState, useEffect} from "react";

function SaleList() {

    const [sales, setSales] = useState([]);

    const fetchData = async () => {
        const url = 'http://localhost:8090/api/sales/';
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          setSales(data.sales)
        }
      }

      useEffect(() => {
          fetchData();
      }, []);

    return (
        <div>
            <table className= "table">
                <thead>
                    <tr>
                        <th scope="col">Sales person name</th>
                        <th scope="col">Sales person employee number</th>
                        <th scope="col">Customer</th>
                        <th scope="col">VIN</th>
                        <th scope="col">Sale price</th>
                    </tr>
                </thead>
                <tbody>
                    {sales?.map(sale => {
                        return (
                            <tr key={sale.automobile.vin}>
                                <td>{sale.sales_person.name}</td>
                                <td>{sale.sales_person.employee_number}</td>
                                <td>{sale.customer.name}</td>
                                <td>{sale.automobile.vin}</td>
                                <td>{sale.price}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default SaleList;
