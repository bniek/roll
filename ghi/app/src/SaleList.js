import React from "react";

function SaleList(props) {
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
                    {props.sales?.map(sale => {
                        return (
                            <tr key={sale.href}>
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
