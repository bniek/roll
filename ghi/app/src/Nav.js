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
              <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/manufacturers">Manufacturers</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/models">Models</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/automobiles">Automobiles</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/customers/new">Add a potential customer</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/sales">All sales</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/salespeople/history">Sales Person History</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/salespeople/new">Add a sales person</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/sales/new">Create a sales record</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/technicians/new">Add technician</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/appointments">Appointments</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/appointments/new">Make an appointment</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/appointments/history">Appointment History</NavLink>
          </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
