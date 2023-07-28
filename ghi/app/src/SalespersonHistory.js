import React, { useEffect, useState } from 'react';

function SalespersonHistory() {
    const [salespeople, setSalespeople] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const fetchData = async () => {
        const url = 'http://localhost:8090/api/salespeople/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setSalespeople(data.salespeople)
        }
    };

    const [sales, setSales] = useState([]);
    const fetchSales = async () => {
        const url = 'http://localhost:8090/api/sales/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setSales(data.sales)
        }
    };


    useEffect(() => {
        fetchData();
        fetchSales();
      }, []);

      const filteredSales = sales.filter(sale => {
        if(searchTerm === "") return true;
        return sale.salesperson.id === Number(searchTerm);
      });

      const handleChange = (event) => {
        setSearchTerm(event.target.value);
      };

    return (
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Salesperson History</h1>
              <form id="salespersonHistory">
                <div className="mb-3">
                    <select onChange={handleChange} required name="salesperson" id="salesperson" className="form-select">
                    <option value="">Choose a Salesperson</option>
                    {salespeople.map(salesperson => {
                      return (
                          <option key={salesperson.id} value={salesperson.id}>
                              {salesperson.employee_id}
                          </option>
                          );
                      })}
                  </select>
                </div>
              </form>
            <table className="table table-striped">
                <thead>
                    <tr>
                    <th>Salesperson</th>
                    <th>Customer</th>
                    <th>VIN</th>
                    <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                {filteredSales.map(sale => {
                  return (
                    <tr key={sale.href}>
                      <td>{ sale.salesperson.employee_id }</td>
                      <td>{ sale.customer.first_name }{ sale.customer.last_name }</td>
                      <td>{ sale.automobile.vin }</td>
                      <td>{ sale.price }</td>
                    </tr>
                  )
                })}
                </tbody>
            </table>
            </div>
          </div>
        </div>
      );

}
export default SalespersonHistory;
