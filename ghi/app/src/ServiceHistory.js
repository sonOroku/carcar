import React, { useEffect, useState } from 'react';

export default function ServiceHistory() {
    const [appointments, setAppointments] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const fetchData = async () => {
        const url = 'http://localhost:8080/api/appointments/'

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setAppointments(data.appointments)
        }
    }

    useEffect(() => {
        fetchData();
      }, []);

      const filteredAppointments = appointments.filter(appointment => {
        return appointment.vin.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <>
        <h1>Service History</h1>

        <input
            type="text"
            placeholder="Search by VIN"
            onChange={event => { setSearchTerm(event.target.value) }}
        />

        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Customer</th>
                    <th>Is VIP?</th>
                    <th>VIN</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Technician</th>
                    <th>Reason</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {filteredAppointments.map(appointment => {
                    const dateTime = new Date(appointment.date_time);
                        const date = new Intl.DateTimeFormat("en-US").format(dateTime);
                        const time = dateTime.toLocaleTimeString("en-US");
                    return (
                        <tr key={appointment.id}>
                            <td>{ appointment.customer }</td>
                            <td>{ appointment.is_vip ? "Yes" : "No" }</td>
                            <td>{ appointment.vin }</td>
                            <td>{ date }</td>
                            <td>{ time }</td>
                            <td>{ appointment.technician.first_name } { appointment.technician.last_name }</td>
                            <td>{ appointment.reason }</td>
                            <td>{ appointment.status }</td>
                        </tr>
                    )
                }
                )}
            </tbody>
        </table>

        </>
    );
}
