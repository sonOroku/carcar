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

    const cancelAppointment = async (id) => {
        const url = `http://localhost:8080/api/appointments/${id}/cancel/`;
        const response = await fetch(url, { method: "PUT" });
        if (response.ok) {
            setAppointments(appointments.filter(appointment => appointment.id !== id));
        }
    }

    const finishAppointment = async (id) => {
        const url = `http://localhost:8080/api/appointments/${id}/finish/`;
        const response = await fetch(url, { method: "PUT" });
        if (response.ok) {
            setAppointments(appointments.filter(appointment => appointment.id !== id));
        }
    }

    const pendingAppointments = appointments.filter(appointment =>
        appointment.status !== "cancelled" && appointment.status !== "finished");

    useEffect(() => {
        fetchData();
      }, []);

    return (
        <>
        <h1>Service Appointments</h1>
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
                {pendingAppointments.map(appointment => {
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
                            <td>
                                <button onClick={() => cancelAppointment(appointment.id)}>Cancel</button>
                                <button onClick={() => finishAppointment(appointment.id)}>Finish</button>
                            </td>
                        </tr>
                    )
                }
                )}
            </tbody>
        </table>
        </>
    );
}
