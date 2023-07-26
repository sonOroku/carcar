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

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        {/* <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes> */}
        <VehicleForm />
      </div>
    </BrowserRouter>
  );
}

export default App;
