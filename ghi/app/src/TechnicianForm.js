import React, { useState, useEffect } from "react";

export default function TechnicianForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        employeeId: "",
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value.trim(),
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = "http://localhost:8080/api/technicians/";
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })

    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="firstName">First Name</label>
            <input
                type="text"
                name="firstName"
                id="firstName"
                onChange={handleChange}
                value={formData.firstName}
            />
            <label htmlFor="lastName">Last Name</label>
            <input
                type="text"
                name="lastName"
                id="lastName"
                onChange={handleChange}
                value={formData.lastName}
            />
            <label htmlFor="employeeId">Employee ID</label>
            <input
                type="text"
                name="employeeId"
                id="employeeId"
                onChange={handleChange}
                value={formData.employeeId}
            />
            <button type="submit">Submit</button>
        </form>
    );
}
