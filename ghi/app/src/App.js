import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalespersonForm from './SalespersonForm';
import CustomerForm from './CustomerForm';
import CustomerList from './CustomerList';
import SalespersonList from './SalespersonList';
import SalesList from './SalesList';
import CreateSaleForm from './CreateSaleForm';
import ManufacturerList from './ManufacturerList';
import ManufacturerForm from './ManufacturerForm';
import VehicleModelsList from './VehicleModelsList';
import VehicleForm from './VehicleForm';
import TechnicianForm from './TechnicianForm';
import AutomobileForm from './AutomobileForm';
import CreateServiceAppointmentForm from './CreateServiceAppointmentForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/salesperson" element={<SalespersonForm />} />
          <Route path="/customer" element={<CustomerForm />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/salespeople" element={<SalespersonList />} />
          <Route path="/sales" element={<SalesList />} />
          <Route path="/createsale" element={<CreateSaleForm />} />
          <Route path="/manufacturers" element={<ManufacturerList />} />
          <Route path="/manufacturer" element={<ManufacturerForm />} />
          <Route path="/vehiclemodels" element={<VehicleModelsList />} />
          <Route path="/vehicle" element={<VehicleForm />} />
          <Route path="/technician" element={<TechnicianForm />} />
          <Route path="/automobile" element={<AutomobileForm />} />
          <Route path="/createserviceappointment" element={<CreateServiceAppointmentForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
