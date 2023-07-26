import React, { useEffect, useState } from 'react';

function CreateSaleForm() {
    const [automobiles, setAutomobiles] = useState([]);
    const fetchData = async () => {
      const url = 'http://localhost:8090/api/unsold_vins';

      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setAutomobiles(data.automobiles)
      }
    };

    const [salespeople, setSalespeople] = useState([]);
    const fetchSalespeople = async () => {
        const url = 'http://localhost:8090/api/salespeople/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setSalespeople(data.salespeople)
        }

    };

    const [customers, setCustomers] = useState([]);
    const fetchCustomer = async () => {
        const url = 'http://localhost:8090/api/customers/'

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setCustomers(data.customers)
        }
    };


    const [price, setPrice] = useState('');
    const handlePriceChange = (event) => {
        const value = event.target.value;
        setPrice(value);
    };

    const [salesperson, setSalesperson] = useState('');
    const handleSalespersonChange = (event) => {
        const value = event.target.value;
        setSalesperson(value);
    };

    const [customer, setCustomer] = useState('');
    const handleCustomerChange = (event) => {
        const value = event.target.value;
        setCustomer(value);
    };

    const [automobile, setAutomobile] = useState('');
    const handleAutomobileChange = (event) => {
        const value = event.target.value;
        setAutomobile(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.price = price;
        data.automobile = automobile;
        data.salesperson = salesperson;
        data.customer = customer;

        const saleUrl = 'http://localhost:8090/api/sales/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(saleUrl, fetchConfig);
        if (response.ok) {
            const newSale = await response.json();
            console.log(newSale);
            setPrice('');
            setAutomobile('');
            setSalesperson('');
            setCustomer('');
        }
    };



    useEffect(() => {
        fetchData();
        fetchCustomer();
        fetchSalespeople();
      }, []);

    return (
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Create a new Sale</h1>
              <form onSubmit={handleSubmit} id="create-sale-form">
                <div className="form-floating mb-3">
                <input onChange={handlePriceChange} placeholder="Price" required
                  type="text" name="price" id="price" value={price}
                  className="form-control" />
                  <label htmlFor="price">Price</label>
                </div>
                <div className="mb-3">
                    <select onChange={handleAutomobileChange} required name="automobile" id="automobile" value={automobile} className="form-select">
                    <option value="">Choose an Automobile Vin</option>
                    {automobiles.map(automobile => {
                      return (
                          <option key={automobile.import_href} value={automobile.import_href}>
                              {automobile.vin}
                          </option>
                          );
                      })}
                  </select>
                </div>
                <div className="mb-3">
                    <select onChange={handleSalespersonChange} required name="salesperson" id="salesperson" value={salesperson} className="form-select">
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
                <div className="mb-3">
                    <select onChange={handleCustomerChange} required name="customer" id="customer" value={customer} className="form-select">
                    <option value="">Choose a Customer</option>
                    {customers.map(customer => {
                      return (
                          <option key={customer.id} value={customer.id}>
                              {customer.phone_number}
                          </option>
                          );
                      })}
                  </select>
                </div>
                <button className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
      );


}

export default CreateSaleForm;
