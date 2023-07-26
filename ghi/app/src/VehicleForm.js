import React, { useEffect, useState } from 'react';

function VehicleForm() {
    const [manufacturers, setManufacturers] = useState([]);
    const fetchData = async () => {
        const url = 'http://localhost:8100/api/manufacturers/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers)
        }
    };

    const [name, setName] = useState('');
    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }

    const [pictureUrl, setPictureUrl] = useState('');
    const handlePictureUrlChange = (event) => {
        const value = event.target.value;
        setPictureUrl(value)
    }

    const [manufacturer, setManufacturer] = useState('');
    const handleManufacturerChange = (event) => {
        const value = event.target.value;
        setManufacturer(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.name = name;
        data.picture_url = pictureUrl;
        data.manufacturer_id = manufacturer;

        const vehicleUrl = 'http://localhost:8100/api/models/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(vehicleUrl, fetchConfig);
        if (response.ok) {
            const newVehicle = await response.json();
            console.log(newVehicle);
            setName('');
            setPictureUrl('');
            setManufacturer('');
        }
    }
    useEffect(() => {
        fetchData();
      }, []);

      return (
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Create a new Vehicle Model</h1>
              <form onSubmit={handleSubmit} id="create-vehicle-form">
                <div className="form-floating mb-3">
                <input onChange={handleNameChange} placeholder="Name" value={name}
                  required type="text" name="name" id="name"
                  className="form-control" />
                  <label htmlFor="name">Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handlePictureUrlChange} placeholder="Picture URL" required type="text" name="picture_url" id="picture_url" value={pictureUrl} className="form-control" />
                  <label htmlFor="picture_url">Picture URL</label>
                </div>
                <div className="mb-3">
                    <select onChange={handleManufacturerChange} required name="manufacturer" id="manufacturer" value={manufacturer} className="form-select">
                    <option value="">Choose a Manufacturer</option>
                    {manufacturers.map(manufacturer => {
                      return (
                          <option key={manufacturer.id} value={manufacturer.id}>
                              {manufacturer.name}
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

export default VehicleForm;
