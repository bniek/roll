import React, { useEffect, useState } from 'react';

function SalesPersonHistory() {
    const [salesPeople, setSalesPeople] = useState([]);
    const [sales, setSales] = useState([]);
    const [salesPerson, setSalesPerson] = useState('');


    const fetchSalesPeopleData = async () => {
        const url = 'http://localhost:8090/api/salespeople/';
        const response = await fetch(url);
        if (response.ok){
            const salesPeopleData = await response.json();
            setSalesPeople(salesPeopleData.sales_people);
        }
    };

    const fetchSalesData = async () => {
        const url = 'http://localhost:8090/api/sales';
        const response = await fetch(url);
        if (response.ok){
            const salesData = await response.json();
            setSales(salesData.sales);
        }
    }
    const handleSalesPersonChange = (event) => {
        const value = event.target.value;
        setSalesPerson(value);
    };

    ;

    const filteredSales = sales?.filter(
        (sale) => sale.sales_person.employee_number === salesPerson
    );

    useEffect(() => {
        fetchSalesData();
        fetchSalesPeopleData();
    }, [])

  return (
    <div>
      <h1>Sales Person History</h1>
      <form id="select-sales-person-form">
        <div className="form-floating mb-3">
          <select
            onChange={handleSalesPersonChange} value={salesPerson} required name="sales person" id="sales person" className="form-select">
            <option value="">Select a sales person</option>
            {salesPeople?.map((salesPerson) => (
              <option
                key={salesPerson.employee_number}
                value={salesPerson.employee_number}
              >
                {salesPerson.name}
              </option>
            ))}
          </select>
        </div>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Sales person</th>
            <th scope="col">Customer</th>
            <th scope="col">VIN</th>
            <th scope="col">Sale price</th>
          </tr>
        </thead>
        <tbody>
          {filteredSales.map((sale) => (
            <tr key={sale.automobile.vin}>
              <td>{sale.sales_person.name}</td>
              <td>{sale.customer.name}</td>
              <td>{sale.automobile.vin}</td>
              <td>{sale.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalesPersonHistory;
