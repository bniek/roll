import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import VehicleModelForm from './VehicleModelForm';
import VehicleModelList from './VehicleModelList';
import SaleList from './SaleList';
import SaleForm from './SaleForm';
import ManufacturerForm from './ManufacturerForm';
import ManufacturerList from './ManufacturerList';
import AutomobileList from './AutomobileList';
import AutomobileForm from './AutomobileForm';
import TechnicianForm from './TechnicianForm';
import SalesPersonForm from './SalesPersonForm'
import CustomerForm from './CustomerForm';
import SalesPersonHistory from './SalesPersonHistory';
import AppointmentForm from './AppointmentForm';
import AppointmentsList from './AppointmentsList';
import AppointmentHistory from './AppointmentHistory';


function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="models">
            <Route path ="" element={<VehicleModelList models={props.models} />} />
          </Route>
          <Route path="models">
            <Route path="new" element={<VehicleModelForm />} />
          </Route>
          <Route path="customers">
              <Route path="new" element={<CustomerForm />} />
          </Route>
          <Route path="sales" >
            <Route path="" element={<SaleList sales={props.sales} />} />
          </Route>
          <Route path="salespeople">
            <Route path="new" element={<SalesPersonForm />} />
            <Route path="history" element={<SalesPersonHistory salesPeople={props.sales} />}/>
          </Route>
          <Route path="sales">
            <Route path="new" element={<SaleForm />} />
          </Route>
          <Route path="manufacturers" element={<ManufacturerList manufacturers={props.manufacturers}/>} />
          <Route path="manufacturers">
            <Route path="new" element={<ManufacturerForm />} />
          </Route>
          <Route path="automobiles" element={<AutomobileList automobiles={props.automobiles}/>} />
          <Route path="automobiles">
            <Route path="new" element={<AutomobileForm />} />
          </Route>
          <Route path="technicians">
            <Route path="new" element={<TechnicianForm />} />
          </Route>
          <Route path="appointments" element={<AppointmentsList appointments={props.appointments}/>} />
          <Route path="appointments">
            <Route path="new" element={<AppointmentForm />} />
            <Route path="history" element={<AppointmentHistory appointments={props.appointments} />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
