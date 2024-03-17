import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';

export default function Menu({array, setArray}) {
    const [latitude, setLatitude] = useState(51.5085)
    const [longitude, setLongitude] = useState(-0.1257)
    const [currentLocation, setCurrentLocation] = useState({latitude: 51.5085, longitude: -0.1257});
    const [city, setCity] = useState('');
    const [countryCode, setCountryCode] = useState('');

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position.coords.latitude, position.coords.longitude)
                setCurrentLocation({latitude: position.coords.latitude, longitude: position.coords.longitude})
                setLatitude(position.coords.latitude)
                setLongitude(position.coords.longitude)
            })
        }
    },[])

    function handleCity(e){
        const arr = e.target.value;
        let newstr = "";
  
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] === ' ') {
            newstr += '+';
          } 
          else {
            newstr += arr[i];
          }
        }
        console.log(newstr)
        setCity(newstr);
      }
      return (
        <div style={{ backgroundColor: '#30363c', width: '1530px', height: '90px', color: 'white', display: 'flex', alignItems: 'center', borderRadius: '5px', fontFamily: 'Garamond' }}>
            <ul style={{ listStyleType: 'none', display: 'flex', alignItems: 'center', gap: '144px' }}>
                <li><Link to="/" style={{ textDecoration: 'none', color: 'white', fontFamily: 'Garamond', fontSize: '45px', marginLeft: '36px' }}>Home</Link></li>
                <li><Link to="/Menu/1" style={{ textDecoration: 'none', color: 'white', fontFamily: 'Garamond', fontSize: '45px' }}>Menu</Link></li>
                <li>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '18px', width: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <label htmlFor="latitude" style={{ backgroundImage: "linear-gradient(60deg, #000000, #2e2e2e, black)", color: "white", padding: "4.5px", borderRadius: "4.5px", marginBottom: "4.5px", width: "117px", textAlign: "center" }}>City Name:</label>
                                <label htmlFor="longitude" style={{ backgroundImage: "linear-gradient(60deg, #000000, #2e2e2e, black)", color: "white", padding: "4.5px", borderRadius: "4.5px", marginBottom: "4.5px", width: "117px", textAlign: "center" }}>Country Code:</label>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', padding: '18px' }}>
                                <input onChange={(e) => handleCity(e)} placeholder={"Enter City Name"} style={{ backgroundColor: "white", color: "black", padding: "4.5px", borderRadius: "4.5px", marginBottom: "4.5px", border: "none", height: '18px', textAlign: "center" }} />
                                <input onChange={(e) => setCountryCode(e.target.value)} placeholder={"Enter Country Code"} style={{ backgroundColor: "white", color: "black", padding: "4.5px", borderRadius: "4.5px", marginBottom: "4.5px", border: "none", height: '18px', textAlign: "center" }} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Link to={countryCode ? `/LearnMore/Address/Type_2/${city}/${countryCode}` : `/LearnMore/1/${city}`} style={{ backgroundImage: "linear-gradient(60deg, #000000, #2e2e2e, black)", color: "white", borderRadius: "4.5px", marginBottom: "4.5px", width: "67.5px", textAlign: "center", border: 'none', fontSize: '16.2px', height: '23.4px', textDecoration: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> Submit </Link>
                            <button onClick={() => { console.log(city, countryCode); const object = { latitude: "null", longitude: "null", display: true, name: "null", name: city, countryCode: countryCode }; setArray([...array, object]) }} style={{ backgroundImage: "linear-gradient(60deg, #000000, #2e2e2e, black)", color: "white", padding: "4.5px", borderRadius: "4.5px", marginBottom: "4.5px", textAlign: "center", border: 'none', fontSize: '16.2px', textDecoration: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'Garamond', height: '23.4px', width: '67.5px' }}> Add </button>
                        </div>
                    </div>
                </li>
                <li>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '18px', width: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <label id="latitude" htmlFor="latitude" style={{ backgroundImage: "linear-gradient(60deg, #000000, #2e2e2e, black)", color: "white", padding: "4.5px", borderRadius: "4.5px", marginBottom: "4.5px", width: "117px", textAlign: "center" }}>Latitude:</label>
                                <label id="longitude" htmlFor="longitude" style={{ backgroundImage: "linear-gradient(60deg, #000000, #2e2e2e, black)", color: "white", padding: "4.5px", borderRadius: "4.5px", marginBottom: "4.5px", width: "117px", textAlign: "center" }}>Longitude:</label>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', padding: '18px' }}>
                                <input onChange={(e) => setLatitude(e.target.value)} placeholder={currentLocation.latitude} style={{ backgroundColor: "white", color: "black", padding: "4.5px", borderRadius: "4.5px", marginBottom: "4.5px", border: "none", height: '18px', textAlign: "center" }} />
                                <input onChange={(e) => setLongitude(e.target.value)} placeholder={currentLocation.longitude} style={{ backgroundColor: "white", color: "black", padding: "4.5px", borderRadius: "4.5px", marginBottom: "4.5px", border: "none", height: '18px', textAlign: "center" }} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Link to={`/LearnMore/${latitude}/${longitude}`} style={{ backgroundImage: "linear-gradient(60deg, #000000, #2e2e2e, black)", color: "white", borderRadius: "4.5px", marginBottom: "4.5px", width: "67.5px", textAlign: "center", border: 'none', fontSize: '16.2px', height: '23.4px', textDecoration: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> Submit </Link>
                            <button onClick={() => { const object = { latitude: latitude, longitude: longitude, display: true, name: "null", countryCode: "null" }; setArray([...array, object]) }} style={{ backgroundImage: "linear-gradient(60deg, #000000, #2e2e2e, black)", color: "white", padding: "4.5px", borderRadius: "4.5px", marginBottom: "4.5px", textAlign: "center", border: 'none', fontSize: '16.2px', textDecoration: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'Garamond', height: '23.4px', width: '67.5px' }}> Add </button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
    
}
