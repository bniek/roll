import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import VehicleModelForm from './VehicleModelForm';
import VehicleModelList from './VehicleModelList';
import AutomobileList from './AutomobileList';

function App(props) {
  // if (props.models == undefined){
  //   return null;
  // }
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
          <Route path="automobiles" >
            <Route path="" element={<AutomobileList automobiles={props.automobiles} />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
