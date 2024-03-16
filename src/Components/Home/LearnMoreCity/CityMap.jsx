import React from 'react'
import L from 'leaflet';
import { useState, useEffect } from 'react';

export default function CityMap({latitude, longitude}) {
    const [change, setChange] = useState(false);

    useEffect(() => {
      console.log(latitude, longitude);
      const map = L.map('map').setView([latitude, longitude], 10);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      return () => {
        map.remove();
      }
    }, [latitude, longitude, change]);

    const handleSetLocation = () => {
      setChange(!change);
    }

    return (
    <div>
        <div id="map" style={{ height: "680px", width: "650px", padding: "15px", margin: "15px", borderRadius: "20px", backgroundColor: "white" }}>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px'}} >
        <div>
            <label htmlFor="latitude" style={{ backgroundColor: "black", color: "white", padding: "5px", borderRadius: "5px", marginBottom: "5px" }}>Latitude:</label>
            <input value={latitude} readOnly style={{ textAlign: 'center', width: '100px', border: "none"}} />
        </div>
        <div>
            <label htmlFor="longitude" style={{ backgroundColor: "black", color: "white", padding: "5px", borderRadius: "5px", marginBottom: "5px" }}>Longitude:</label>
            <input value={longitude} readOnly style={{ textAlign: 'center', width: '100px', border: "none" }} />
        </div>
        <div>
            <button onClick={handleSetLocation} style={{ backgroundColor: "black", color: "white", padding: "5px", borderRadius: "5px", marginBottom: "5px", height: "35px", fontSize : "15px", textAlign: "center", paddingTop : "8px"}}>Set Location</button>
        </div>
        </div>
    </div>
    );
}

// const userLatitudeContext = useContext(UserLatitudeContext);
// const userLongitudeContext = useContext(UserLongitudeContext);
// const [latitude, setLatitude] = useState(userLatitudeContext);
// const [longitude, setLongitude] = useState(userLongitudeContext);
// const [change, setChange] = useState(false);

// useEffect(() => {
//   console.log(latitude, longitude);
//   const map = L.map('map').setView([latitude, longitude], 10);

//   L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//   }).addTo(map);

//   return () => {
//     map.remove();
//   };
// }, [latitude, longitude, change]);

// const handleSetLocation = () => {
//   setChange(!change);
//   setLatitude(userLatitudeContext);
//   setLongitude(userLongitudeContext);
// };

// return (
//   <div>
//     <div id="map" style={{ height: "680px", width: "650px", padding: "15px", margin: "15px", borderRadius: "20px", backgroundColor: "white" }}>
//     </div>
//     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px'}} >
//       <div>
//         <label htmlFor="latitude" style={{ backgroundColor: "black", color: "white", padding: "5px", borderRadius: "5px", marginBottom: "5px" }}>Latitude:</label>
//         <input value={userLatitudeContext} readOnly style={{ textAlign: 'center', width: '100px', border: "none"}} />
//       </div>
//       <div>
//         <label htmlFor="longitude" style={{ backgroundColor: "black", color: "white", padding: "5px", borderRadius: "5px", marginBottom: "5px" }}>Longitude:</label>
//         <input value={userLongitudeContext} readOnly style={{ textAlign: 'center', width: '100px', border: "none" }} />
//       </div>
//       <div>
//           <button onClick={handleSetLocation} style={{ backgroundColor: "black", color: "white", padding: "5px", borderRadius: "5px", marginBottom: "5px", height: "35px", fontSize : "15px", textAlign: "center", paddingTop : "8px"}}>Set Location</button>
//       </div>
//     </div>
//   </div>
// );
