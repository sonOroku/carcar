import React, { useEffect, useState } from 'react';

function AutomobileForm() {
    const [models, setModels] = useState([]);
    const fetchData = async () => {
        const url = 'http://localhost:8100/api/models/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setModels(data.models)
        }
    };

    const [color, setColor] = useState('');
    const handleColorChange = (event) => {
        const value = event.target.value;
        setColor(value);
    };

    const [year, setYear] = useState('');
    const handleYearChange = (event) => {
        const value = event.target.value;
        setYear(value)
    };

    const [vin, setVin] = useState('');
    const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value)
    };

    const [model, setModel] = useState('');
    const handleModelChange = (event) => {
        const value = event.target.value;
        setModel(value)
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.color = color;
        data.year = year;
        data.vin = vin;
        data.model_id = model;

        console.log(data)

        const automobileUrl = 'http://localhost:8100/api/automobiles/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(automobileUrl, fetchConfig);
        if (response.ok) {
            const newAutomobile = await response.json();
            console.log(newAutomobile);
            setColor('');
            setYear('');
            setVin('');
            setModel('');
        }
    }
    useEffect(() => {
        fetchData();
      }, []);


    return (
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Create a new Automobile</h1>
              <form onSubmit={handleSubmit} id="create-automobile-form">
                <div className="form-floating mb-3">
                <input onChange={handleColorChange} placeholder="Color" value={color}
                  required type="text" name="color" id="color"
                  className="form-control" />
                  <label htmlFor="color">Color</label>
                </div>
                <div className="form-floating mb-3">
                <input onChange={handleYearChange} placeholder="Year" value={year}
                  required type="number" name="year" id="year"
                  className="form-control" />
                  <label htmlFor="year">Year</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleVinChange} placeholder="Vin" required type="text" name="vin" id="vin" value={vin} className="form-control" />
                  <label htmlFor="vin">VIN</label>
                </div>
                <div className="mb-3">
                    <select onChange={handleModelChange} required name="model" id="model" value={model} className="form-select">
                    <option value="">Choose a Model</option>
                    {models.map(model => {
                      return (
                          <option key={model.id} value={model.id}>
                              {model.name}
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

export default AutomobileForm;
