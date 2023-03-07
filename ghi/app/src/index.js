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
  const modelResponse = await fetch('http://localhost:8100/api/models/');
  const manufacturerResponse = await fetch('http://localhost:8100/api/manufacturers/');
  if(modelResponse.ok  && manufacturerResponse.ok) {
    const manufacturerData = await manufacturerResponse.json();
    const modelData = await modelResponse.json();
    root.render(
      <React.StrictMode>
        <App models={modelData.models} manufacturers={manufacturerData.manufacturers} />
      </React.StrictMode>
    );
  } else {
    console.error(manufacturerResponse);
    console.error(modelResponse);
  }
}
loadData();
