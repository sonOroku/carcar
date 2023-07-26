import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/salesperson">Create Salesperson</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/salespeople">List Salespeople</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/customer">Add Customer</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/customers">List Customers</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/createsale">Record Sale</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sales">List Sales</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/manufacturers">List Manufacturers</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/manufacturer">Create Manufacturer</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/vehiclemodels">List of Vehicle Models</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/vehicle">Create Vehicle Model</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
