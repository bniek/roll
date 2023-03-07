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
  const saleResponse = await fetch('http://localhost:8090/api/sales/')
  const modelResponse = await fetch('http://localhost:8100/api/models/');
  const manufacturerResponse = await fetch('http://localhost:8100/api/manufacturers/');
  if(modelResponse.ok  && manufacturerResponse.ok && saleResponse.ok) {
    const manufacturerData = await manufacturerResponse.json();
    const modelData = await modelResponse.json();
    const saleData = await saleResponse.json();
    root.render(
      <React.StrictMode>
        <App models={modelData.models} manufacturers={manufacturerData.manufacturers} sales={saleData.sales}/>
      </React.StrictMode>
    );
  } else {
    console.error(manufacturerResponse);
    console.error(modelResponse);
    console.error(saleResponse);
  }
}
loadData();
