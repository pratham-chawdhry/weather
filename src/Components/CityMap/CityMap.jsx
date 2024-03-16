import React, { useEffect, useContext, useState } from 'react';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import L from 'leaflet'; // Import Leaflet library

function CityMap( {latitude, longitude, setLatitude, setLongitude} ) {
  const [change, setChange] = useState(false);

  useEffect(() => {
    console.log(latitude, longitude);
    const map = L.map('map').setView([latitude, longitude], 10);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    return () => {
      map.remove();
    };
  }, [latitude, longitude, change]);

  const handleSetLocation = () => {
    setChange(!change);
    setLatitude(latitude);
    setLongitude(longitude);
  };

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

export default CityMap;
