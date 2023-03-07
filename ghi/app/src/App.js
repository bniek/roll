import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import VehicleModelForm from './VehicleModelForm';
import VehicleModelList from './VehicleModelList';
import SaleList from './SaleList';

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
          <Route path="sales" >
            <Route path="" element={<SaleList sales={props.sales} />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
