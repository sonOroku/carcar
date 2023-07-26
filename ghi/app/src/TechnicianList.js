import React, { useEffect, useState } from 'react';

export default function TechnicianList() {
    const [technicians, setTechnicians] = useState([]);
    const fetchData = async () => {
        const url = 'http://localhost:8080/api/technicians/'

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setTechnicians(data.technicians)
        }
    };

    useEffect(() => {
        fetchData();
      }, []);

    return (

        <table className="table table-striped">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Employee ID</th>
            </tr>
          </thead>
          <tbody>
            {technicians.map(technician => {
              return (
                <tr key={technician.id}>
                  <td>{ technician.first_name }</td>
                  <td>{ technician.last_name }</td>
                  <td>{ technician.employee_id }</td>
                </tr>
              )
            })}
          </tbody>
        </table>
    );
}
