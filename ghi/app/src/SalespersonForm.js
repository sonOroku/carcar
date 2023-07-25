import React, { useEffect, useState } from 'react';


function SalespersonForm() {


    const [firstName, setFirstName] = useState('');
    const handleFirstNameChange = (event) => {
        const value = event.target.value;
        setFirstName(value);
    }

    const [lastName, setLastName] = useState('');
    const handleLastNameChange = (event) => {
        const value = event.target.value;
        setLastName(value);
    }

    const [employeeId, setEmployeeId] = useState('');
    const handleEmployeeIdChange = (event) => {
        const value = event.target.value;
        setEmployeeId(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.first_name = firstName;
        data.last_name = lastName;
        data.employee_id = employeeId;

        const salespersonUrl = 'http://localhost:8090/api/salespeople/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(salespersonUrl, fetchConfig);
        if (response.ok) {
            const newSalesperson = await response.json();
            setFirstName('');
            setLastName('');
            setEmployeeId('');
        }
    }

    useEffect(() => {
      }, []);


    return (
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Create a new Salesperson</h1>
              <form onSubmit={handleSubmit} id="create-salesperson-form">
                <div className="form-floating mb-3">
                <input onChange={handleFirstNameChange} placeholder="First Name" required
                  type="text" name="first_name" id="first_name" value={firstName}
                  className="form-control" />
                  <label htmlFor="first_name">First Name</label>
                </div>
                <div className="form-floating mb-3">
                <input onChange={handleLastNameChange} placeholder="Last Name" value={lastName}
                  required type="text" name="last_name" id="last_name"
                  className="form-control" />
                  <label htmlFor="last_name">Last Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleEmployeeIdChange} placeholder="Employee ID" required type="text" name="employee_id" id="employee_id" value={employeeId} className="form-control" />
                  <label htmlFor="employee_id">Employee ID</label>
                </div>
                <button className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
      );
}
export default SalespersonForm;
