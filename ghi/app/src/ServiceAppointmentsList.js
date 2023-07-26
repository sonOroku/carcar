import React, { useEffect, useState } from 'react';

export default function ServiceAppointmentsList() {
    const [appointments, setAppointments] = useState([]);
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

    return (

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
                </tr>
            </thead>
            <tbody>
                {appointments.map(appointment => {
                    return (
                        <tr key={appointment.id}>
                            <td>{ appointment.customer }</td>
                            <td>{ appointment.is_vip ? "Yes" : "No" }</td>
                            <td>{ appointment.vin }</td>
                            <td>{ appointment.date_time }</td>
                            <td>{ appointment.date_time }</td>
                            <td>{ appointment.technician.first_name } { appointment.technician.last_name }</td>
                            <td>{ appointment.reason }</td>
                        </tr>
                    )
                }
                )}
            </tbody>
        </table>
    );
}
