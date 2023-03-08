import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

async function loadData() {
  const manufacturerResponse = await fetch('http://localhost:8100/api/manufacturers/');
  const automobileResponse = await fetch('http://localhost:8100/api/automobiles/');
  const appointmentResponse = await fetch('http://localhost:8080/api/appointments/')

  if (manufacturerResponse.ok && automobileResponse.ok && appointmentResponse.ok) {
    const manufacturerData = await manufacturerResponse.json();
    const automobileData = await automobileResponse.json();
    const appointmentData = await appointmentResponse.json();
    root.render(
      <React.StrictMode>
        <App manufacturers={manufacturerData.manufacturers} automobiles={automobileData.automobiles} appointments={appointmentData.appointments} />
      </React.StrictMode>
    );
  } else {
    console.error(manufacturerResponse);
    console.error(automobileResponse);
    console.error(appointmentResponse)

  }
}
loadData();
