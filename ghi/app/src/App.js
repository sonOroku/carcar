import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalespersonForm from './SalespersonForm';
import CustomerForm from './CustomerForm';
import CustomerList from './CustomerList';
import SalespersonList from './SalespersonList';
import SalesList from './SalesList';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        {/* <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes> */}
        <SalesList />
      </div>
    </BrowserRouter>
  );
}

export default App;
