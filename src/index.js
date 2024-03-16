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
        <Route path="/LearnMore/Address/Type_2/:city/:countryCode" element={<LearnMoreCity />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

//import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import Home from './Components/Home/Home';
// import LearnMore from './Components/LearnMore/LearnMore';
// import reportWebVitals from './reportWebVitals';
// import LearnMoreCity from './Components/Home/LearnMoreCity/LearnMoreCity';
// import { BrowserRouter as Link, createBrowserRouter } from 'react-router-dom';
// import { RouterProvider } from 'react-router-dom';

// const router = createBrowserRouter([
//   {
//     path: "/Menu/:id",
//     element: <App />,
//     errorElement: <div>Page Not Found <Link to="/">Go Home</Link></div>
//   },
//   {
//     path: "/LearnMore/:lat/:lon",
//     element: <LearnMore/>,
//     errorElement: <div>Page Not Found <Link to="/">Go Home</Link></div>
//   },
//   {
//     path: "/",
//     element: <Home/>,
//     errorElement: <div>Page Not Found <Link to="/">Go Home</Link></div>
//   },
//   {
//     path: "/LearnMore/1/:city",
//     element : <LearnMoreCity/>,
//     errorElement: <div>Page Not Found <Link to="/">Go Home</Link></div>
//   },
//   {
//     path: "/LearnMore/Address/Type_2/:city/:countryCode",
//     element: <LearnMoreCity/>,
//     errorElement: <div>Page Not Found <Link to="/">Go Home</Link></div>
//   }
// ]);

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );

// reportWebVitals();
