import './WeatherTemplate.css';
import Weather from  '../Weather/weather'
import { useState } from 'react';
import { useEffect } from 'react';
import Map from '../Map/Map'
import { useContext, createContext } from 'react';
import {Link} from 'react-router-dom'
import Menu from '../Menu';
import WeatherTwo from './WeatherTwo';

export const UserLatitudeContext = createContext();
export const UserLongitudeContext = createContext();

function App() {
    const [array, setArray] = useState(() => {
      const cachedArray = localStorage.getItem('cachedArray');
      return cachedArray ? JSON.parse(cachedArray) : [
        { latitude: 51.5085, longitude: -0.1257, display: true, name: "null", countryCode: "null"},
        { latitude: 1.3521, longitude: 103.8198, display: true, name: "null", countryCode: "null"},
        { latitude: 43.6532, longitude: -79.3832, display: true, name: "null", countryCode: "null"},
        { latitude: 37.7749, longitude: -122.4194, display: true, name: "null", countryCode: "null"},
        { latitude: "null", longitude: "null", display: true, name: "Lahore", countryCode: "PK"},
        { latitude: "null", longitude: "null", display: true, name: "Xinjing", countryCode: "CN"},
        { latitude: "null", longitude: "null", display: true, name: "Denali", countryCode: "US"},
        { latitude: "null", longitude: "null", display: true, name: "Oymyakon", countryCode: "Russia"},
        { latitude: "null", longitude: "null", display: true, name: "Dallol", countryCode: "Ethiopia"},
        { latitude: "null", longitude: "null", display: true, name: "Delhi", countryCode: "US"},
      ];
    });

    const [count, setCount] = useState(3);
    const [change, setChange] = useState(false);
    const [currentPage, setCurrentPage] = useState('1');
    const [newArray, setNewArray] = useState([]);

    useEffect(() => {
      setNewArray(array.filter(({latitude, longitude, display, name, countryCode}) => {
        return display === true;
      }))
    }, [array]);

    useEffect(() => {
      localStorage.setItem('cachedArray', JSON.stringify(array));
    }, [array]);

    useEffect(() => {
      const handleUnload = () => {
        localStorage.removeItem('cachedArray');
      };
  
      window.addEventListener('beforeunload', handleUnload);
      return () => {
        window.removeEventListener('beforeunload', handleUnload);
      };
    }, []);
  
  
  const [currentLatitudeLongitude, setCurrentLatitudeLongitude] = useState({latitude : 51.5085, longitude : -0.1257})
  const [latitudeOriginal, setLatitudeOriginal] = useState(51.5085);
  const [longitudeOriginal, setLongitudeOriginal] = useState(-0.1257);
  const [latitudeOriginalPosition, setLatitudeOriginalPosition] = useState(51.5085);
  const [longitudeOriginalPosition, setLongitudeOriginalPosition] = useState(-0.1257);

  useEffect(() => {
    const initMap = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          setLatitudeOriginalPosition(position.coords.latitude);
          setLongitudeOriginalPosition(position.coords.longitude);
          setLatitudeOriginal(position.coords.latitude);
          setLongitudeOriginal(position.coords.longitude);
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    };

    initMap();
  }, []);

  console.log(currentLatitudeLongitude)
  console.log(change)

  return (
      <div>
          <Menu array={array} setArray={setArray} />
          <div className="Final" style={{ fontFamily: 'Garamond', paddingTop: '0px', marginTop: '18px' }}>
              <div style={{ position: 'relative', paddingTop: '0px' }}>
                  <div className="App Additional Home" style={{ backgroundImage: `url(${require(`../../images/Pic.webp`)})`, position: 'absolute', zIndex: '0', fontFamily: 'Garamond' }}></div>
                  <div className='App Additional' style={{ position: 'relative', zIndex: '1', fontFamily: 'Garamond' }}>
                      {(currentPage === '1') && (
                          <UserLatitudeContext.Provider value={latitudeOriginalPosition}>
                              <UserLongitudeContext.Provider value={longitudeOriginalPosition}>
                                  <Weather latitude={latitudeOriginalPosition} longitude={longitudeOriginalPosition} onClick={() => { setCurrentLatitudeLongitude({ latitudeOriginalPosition, longitudeOriginalPosition }); setLatitudeOriginal(latitudeOriginalPosition); setLongitudeOriginal(longitudeOriginalPosition); }} display={true} index={-1} />
                              </UserLongitudeContext.Provider>
                          </UserLatitudeContext.Provider>)}
                      {/* Wrap the Weather components with UserLaContext.Provider for each latitude */}
                      {newArray.map(({ latitude, longitude, display, name, countryCode }, index) => (
                          display && (index <= currentPage * 4 - 2) && (index >= currentPage * 4 - 5) && (
                              (name === "null" && countryCode === "null") ? (
                                  <div key={index}>
                                      <Weather key={index} latitude={latitude} longitude={longitude}
                                          onClick={() => {
                                              setCurrentLatitudeLongitude({ latitude, longitude });
                                              setLatitudeOriginal(latitude);
                                              setLongitudeOriginal(longitude);
                                          }}
                                          index={index} />
                                  </div>

                              ) : (
                                  <WeatherTwo name={name} key={index} display={display} setCurrentLatitudeLongitude={setCurrentLatitudeLongitude} setLatitudeOriginal={setLatitudeOriginal} setLongitudeOriginal={setLongitudeOriginal} countryCode={countryCode} latitude={latitude} longitude={longitude} index={index} />
                              )
                          )
                      ))}
                  </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                  <Map array={array} setArray={setArray} newArray={newArray} setNewArray={setNewArray} latitudeOriginal={latitudeOriginal} longitudeOriginal={longitudeOriginal} setLatitudeOriginal={setLatitudeOriginal} setLongitudeOriginal={setLongitudeOriginal} setCurrentLatitudeLongitude={setCurrentLatitudeLongitude} latitudeOriginalPosition={latitudeOriginalPosition} longitudeOriginalPosition={longitudeOriginalPosition} count={count} setCount={setCount} />
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '450px', gap: '9px' }}>
                      <Link to="/Menu/1" onClick={() => setCurrentPage('1')} style={{ backgroundColor: "black", color: "white", padding: "4.5px", borderRadius: "90px", marginBottom: "4.5px", height: "31.5px", fontSize: "13.5px", textAlign: "center", paddingTop: "7.2px", width: "31.5px", textDecoration: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '18px' }}>1</Link>
                      {newArray.map(({ latitude, longitude, display }, index) => (
                          display && (index % 4 === 3) && (
                              <Link to={`/Menu/${Math.floor(index / 4 + 0.25) + 1}`} key={`page-${Math.floor(index / 4 + 0.25) + 1}`} onClick={() => setCurrentPage(Math.floor(index / 4 + 0.25) + 1)} style={{ backgroundColor: "black", color: "white", padding: "4.5px", borderRadius: "90px", marginBottom: "4.5px", height: "31.5px", fontSize: "13.5px", textAlign: "center", paddingTop: "7.2px", width: "31.5px", textDecoration: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '18px' }}> {Math.floor(index / 4 + 0.25) + 1}</Link>
                          )
                      ))}
                  </div>
              </div>
          </div>
      </div>
  );
}

export default App;