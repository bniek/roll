import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

async function loadData () {
  const saleResponse = await fetch('http://localhost:8090/api/sales/');
  const modelResponse = await fetch('http://localhost:8100/api/models/');
  const manufacturerResponse = await fetch('http://localhost:8100/api/manufacturers/');
  const automobileResponse = await fetch('http://localhost:8100/api/automobiles/');
  const appointmentResponse = await fetch('http://localhost:8080/api/appointments/')

  if (modelResponse.ok && manufacturerResponse.ok && saleResponse.ok && automobileResponse.ok && appointmentResponse.ok) {
    const modelData = await modelResponse.json();
    const manufacturerData = await manufacturerResponse.json();
    const saleData = await saleResponse.json();
    const automobileData = await automobileResponse.json();
    const appointmentData = await appointmentResponse.json();

    root.render(
      <React.StrictMode>
        <App sales={saleData.sales} manufacturers={manufacturerData.manufacturers} automobiles={automobileData.automobiles} appointments={appointmentData.appointments} models={modelData.models}/>
      </React.StrictMode>
    );
  } else {
    console.error(manufacturerResponse);
    console.error(modelResponse);
    console.error(saleResponse);
    console.error(automobileResponse);
    console.error(appointmentResponse)

  }
}
loadData();
