import React, { useState, useEffect } from "react";

export default function CreateServiceAppointmentForm() {
    const [formData, setFormData] = useState({
        customer: "",
        vin: "",
        date: "",
        time: "",
        technician: "",
        reason: "",
    });

    const [technicians, setTechnicians] = useState([]);

    const fetchTechnicians = async () => {
        const url = "http://localhost:8080/api/technicians/";
        const response = await fetch(url);
        const data = await response.json();
        setTechnicians(data.technicians);
    }

    useEffect(() => {
        fetchTechnicians();
    }, []);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.customer = formData.customer;
        data.vin = formData.vin;
        data.date_time = `${formData.date}T${formData.time}:00+00:00`;
        data.technician_id = formData.technician;
        data.reason = formData.reason;
        console.log(data)

        const url = "http://localhost:8080/api/appointments/";
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            setFormData({
                customer: "",
                vin: "",
                date: "",
                time: "",
                technician: "",
                reason: "",
            });
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="customer">Customer</label>
            <input
                type="text"
                name="customer"
                id="customer"
                onChange={handleChange}
                value={formData.customer}
            />
            <label htmlFor="vin">VIN</label>
            <input
                type="text"
                name="vin"
                id="vin"
                onChange={handleChange}
                value={formData.vin}
            />
            <label htmlFor="date">Date</label>
            <input
                type="date"
                name="date"
                id="date"
                onChange={handleChange}
                value={formData.date}
            />
            <label htmlFor="time">Time</label>
            <input
                type="time"
                name="time"
                id="time"
                onChange={handleChange}
                value={formData.time}
            />
            <label htmlFor="technician">Technician</label>
            <select
                name="technician"
                id="technician"
                onChange={handleChange}
                value={formData.technician}
            >
                {technicians.map((technician) => (
                    <option key={technician.id}
                    value={technician.id}
                    >
                    {technician.first_name} {technician.last_name}
                    </option>
                ))}
            </select>

            <label htmlFor="reason">Reason</label>
            <input
                type="text"
                name="reason"
                id="reason"
                onChange={handleChange}
                value={formData.reason}
            />
            <button type="submit">Submit</button>
        </form>
    );
}
