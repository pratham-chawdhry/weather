import React, { useEffect, useState } from 'react';
import L, { latLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import Weather from '../Weather/weather'
import { createContext } from 'react';
import { UserLatitudeContext } from '../WeatherTemplate/WeatherTemplate'
import { UserLongitudeContext } from '../WeatherTemplate/WeatherTemplate'

const LeafletMap = ({ array, setArray, newArray, setNewArray, latitudeOriginal, longitudeOriginal, setLatitudeOriginal, setLongitudeOriginal, setCurrentLatitudeLongitude, latitudeOriginalPosition, longitudeOriginalPosition, count, setCount}) => {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    const map = L.map('map').setView([latitudeOriginal, longitudeOriginal], 10);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      noWrap: true}).addTo(map);
    

    map.on('click', function(e) {
      if (e.latlng.lat < -90 || e.latlng.lat > 90 || e.latlng.lng < -180 || e.latlng.lng > 180) {
        return;
      }
      const object = {
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
        display : true
      };
      setCurrentLatitudeLongitude(object);
      setLatitudeOriginal(object.latitude);
      setLongitudeOriginal(object.longitude);
      setArray((array) => [...array, object]);

      console.log(e)
      console.log(object);
      setNewArray((newArray) => [...newArray, object]);
      setCount(count + 1);
      localStorage.setItem('cachedArray', JSON.stringify(array));
    });

    // Clean up map when component unmounts
    return () => map.remove();
  }, [latitudeOriginal, longitudeOriginal, setArray]);

  return (
    <div style = {{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom : '50px'}}>
      <div style = {{alignItems: 'center', justifyContent: 'center', display: 'flex', textAlign: 'center', flexDirection: 'column'}}>
          <div style = {{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor : 'white', borderRadius : '20px', height : '100vh'}}>
            <div id="map" style={{ width: '600px', height: '800px', paddingLeft : '15px', marginLeft : '15px', borderRadius : '20px'}}></div>
            <div style = {{display: 'flex', justifyContent: 'center ', alignItems: 'center', marginTop : '10px'}}>
              <div>
                <label htmlFor="latitude" style={{backgroundColor: "black", color: "white", padding: "5px", borderRadius: "5px", marginBottom: "5px", fontSize : '18px'}}>Latitude:</label>
                <input value={latitudeOriginal} readOnly style={{textAlign : 'center', width : '100px', border : "none"}}/>
              </div>
              <div>
                <label htmlFor="longitude" style={{backgroundColor: "black", color: "white", padding: "5px", borderRadius: "5px", marginBottom: "5px", fontSize : '18px'}}>Longitude:</label>
                <input value={longitudeOriginal} readOnly style={{textAlign : 'center', width : '100px', border: "none"}}/>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default LeafletMap;
