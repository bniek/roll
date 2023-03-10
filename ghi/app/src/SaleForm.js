import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SaleForm() {

    const navigate = useNavigate();
    const [sales, setSales] = useState([]);
    const [automobiles, setAutomobiles] = useState([]);
    const [salesPeople, setSalesPeople] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [price, setPrice] = useState('');
    const [automobile, setAutomobile] = useState('');
    const [salesPerson, setSalesPerson] = useState('');
    const [customer, setCustomer] = useState('');


    const handlePriceChange = (event) => {
      const value = event.target.value;
      setPrice(value);
  }

  const handleAutomobileChange = (event) => {
      const value = event.target.value;
      setAutomobile(value);
  }

  const handleSalesPersonChange = (event) => {
      const value = event.target.value;
      setSalesPerson(value);
  }

  const handleCustomerChange = (event) => {
      const value = event.target.value;
      setCustomer(value);
  }


    const fetchSalesData = async () => {
      const url = 'http://localhost:8090/api/sales';
      const salesResponse = await fetch(url);
      if (salesResponse.ok){
          const salesData = await salesResponse.json();
          setSales(salesData.sales);
      }
  }

    const fetchAutomobileData = async () => {
        const url = 'http://localhost:8100/api/automobiles/';
        const response = await fetch(url);

        if (response.ok){
            const automobileData = await response.json();
            setAutomobiles(automobileData.automobiles);
        }
    }

    const fetchSalesPeopleData = async () => {
        const url = 'http://localhost:8090/api/salespeople/';
        const response = await fetch(url);
        if (response.ok){
            const salesPeopleData = await response.json();
            setSalesPeople(salesPeopleData.sales_people);
        }
    }


    const fetchCustomerData = async () => {
        const url = 'http://localhost:8090/api/customers/';
        const response = await fetch(url);
        if (response.ok){
            const CustomerData = await response.json();
            setCustomers(CustomerData.customers);
        }
      }

    const updateAutomobile = async (automobile) => {
            const soldUrl = `http://localhost:8100/api/automobiles/${automobile}/`;
            const soldResponse = await fetch(soldUrl, {
                method: 'PUT',
                body: JSON.stringify({ sold: true }),
                headers: { 'Content-Type': 'application/json' }
            })

          }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.price = price;
        data.automobile = automobile;
        data.sales_person = salesPerson;
        data.customer = customer;

        const salesUrl = 'http://localhost:8090/api/sales/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type':'application/json',
            }
        }

        const response = await fetch(salesUrl, fetchConfig);
        if(response.ok){
            const newSale = await response.json();

            setPrice('');
            setAutomobile('');
            setSalesPerson('');
            setCustomer('');

            setSales([...sales, newSale]);
            navigate('/sales/');
            fetchSalesData();

            }


        }

    useEffect(() => {
        fetchAutomobileData();
        fetchCustomerData();
        fetchSalesPeopleData();
        fetchSalesData();
    }, []);

    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Record a New Sale</h1>
            <form onSubmit={handleSubmit} id="create-sale-form">
            <div className="form-floating mb-3">
                <select onChange={handleAutomobileChange} value={automobile} required name="automobile" id="automobile" className="form-select">
                <option value="">Choose an automobile</option>
                  {automobiles?.map(automobile => { if(automobile.sold === false)
                    return (
                      <option key={automobile.href} value={automobile.vin}>
                        {automobile.vin}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-floating mb-3">
                <select onChange={handleSalesPersonChange} value={salesPerson} required name="sales person" id="sales person" className="form-select">
                <option value="">Choose a sales person</option>
                  {salesPeople?.map(salesPerson => {
                    return (
                      <option key={salesPerson.employee_number} value={salesPerson.employee_number}>
                        {salesPerson.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-floating mb-3">
                <select onChange={handleCustomerChange} value={customer} required name="customer" id="customer" className="form-select">
                <option value="">Choose a customer</option>
                  {customers?.map(customer => {
                    return (
                      <option key={customer.phone_number} value={customer.phone_number}>
                        {customer.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handlePriceChange} value={price} placeholder="Price" required type="text" name="price"  id="price" className="form-control"/>
                <label htmlFor="price">Sale price</label>
              </div>
              <button onClick={() => updateAutomobile(automobile)} className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
}

export default SaleForm;
