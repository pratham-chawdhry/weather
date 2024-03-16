import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from './Components/Home/Home';
import LearnMore from './Components/LearnMore/LearnMore';
import reportWebVitals from './reportWebVitals';
import LearnMoreCity from './Components/Home/LearnMoreCity/LearnMoreCity';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename="/weather">
      <Routes>
        <Route path="/Menu/:id" element={<App />} />
        <Route path="/LearnMore/:lat/:lon" element={<LearnMore />} />
        <Route path="/" element={<Home />} />
        <Route path="/LearnMore/1/:city" element={<LearnMoreCity />} />
        <Route path="/LearnMore/Address/Type_2/:city/:countryCode" element={<LearnMoreCity />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
