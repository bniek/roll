import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <>
      <nav className="navbar" style={{backgroundColor: '#223835'}}>
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/" style={{ color: '#ffffff', paddingLeft: '20px' }}>ROLL</NavLink>
          <div className="d-flex justify-content-end">
            <div className="nav-item dropdown">
              <button style={{borderColor: '#223835', backgroundColor: '#223835'}} className="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                Inventory
              </button>
              <div className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                <li><NavLink className="dropdown-item" aria-current="page" to="manufacturers/new/">New Manufacturer</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="manufacturers/">All Manufacturers</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="models/new/">New Vehicle Model</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="models/">All Models</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="automobiles/new/">New Automobile</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="automobiles/">All Automobiles</NavLink></li>
              </div>
            </div>
            <div className="nav-item dropdown">
              <button style={{borderColor: '#223835', backgroundColor: '#223835'}} className="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                Sales
              </button>
              <div className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                <li><NavLink className="dropdown-item" aria-current="page" to="/customers/new">New Customers</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="/salespeople/new">New Sales Representative</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="/sales/new">New Sales Records</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="/sales">All Sales Records</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="/salespeople/history">Sales By Employee</NavLink></li>
              </div>
            </div>
            <div className="nav-item dropdown" style={{ paddingRight: '10px' }}>
              <button style={{borderColor: '#223835', backgroundColor: '#223835'}} className="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                Service
              </button>
              <div className="dropdown-menu dropdown-menu-end dropdown-menu-dark open" aria-labelledby="dropdownMenuButton2">
                <li><NavLink className="dropdown-item" aria-current="page" to="/technicians/new">Create a Technician</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="/technicians">All Technician</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="/appointments/new">Create Service</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="/appointments/history">Service History</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="/appointments">Service Appointments</NavLink></li>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );

}

export default Nav;
