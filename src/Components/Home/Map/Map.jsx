import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import L from 'leaflet'; // Import Leaflet library

function CityMap() {

  const [latitude, setLatitude] = useState(51.5085);
  const [longitude, setLongitude] = useState(-0.1257);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    })
  }
  const [change, setChange] = useState(false);

  useEffect(() => {
    const map = L.map('map').setView([latitude, longitude], 12);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    return () => {
      map.remove();
    };
  }, [latitude, longitude, change]);

  return (
    <div style = {{height: "100vh", width: "800px"}}>
      <div id="map" style={{ height: "100vh", width: "800px", backgroundColor: "white", border : "1px solid white", borderTopRightRadius: "300px", borderBottomRightRadius: "300px"}}>
      </div>
    </div>
  );
}

export default CityMap;
