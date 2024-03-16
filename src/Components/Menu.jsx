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
        let newstr = '';
  
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] === ' ') {
            newstr += '+';
          } 
          else {
            newstr += arr[i];
          }
        }
  
        setCity(newstr);
      }
  return (
    <div style = {{backgroundColor : '#30363c', width : '1700px', height: '100px', color : 'white', display : 'flex', alignItems : 'center', borderRadius: '5px', fontFamily: 'Garamond'}}>
      <ul style = {{listStyleType : 'none', display : 'flex', alignItems : 'center', gap : '160px'}}>
        <li><Link to = "/" style = {{ textDecoration : 'none', color : 'white', fontFamily: 'Garamond', fontSize : '50px', marginLeft: '40px'}}>Home</Link></li>
        <li><Link to = "/Menu/1" style = {{ textDecoration : 'none', color : 'white', fontFamily: 'Garamond', fontSize : '50px'}}>Menu</Link></li>
        <li>
          <div style = {{display : 'flex', justifyContent : 'center', alignItems : 'center',borderRadius: '20px', width : 'auto'}}>
            <div style = {{display : 'flex', justifyContent : 'center', alignItems : 'center'}}>
              <div style = {{display : 'flex', flexDirection : 'column'}}>
                  <label htmlFor="latitude" style={{ backgroundImage: "linear-gradient(60deg, #000000, #2e2e2e, black)", color: "white", padding: "5px", borderRadius: "5px", marginBottom: "5px", width: "130px", textAlign: "center"}}>City Name:</label>
                  <label htmlFor="longitude" style={{ backgroundImage: "linear-gradient(60deg, #000000, #2e2e2e, black)", color: "white", padding: "5px", borderRadius: "5px", marginBottom: "5px", width: "130px", textAlign: "center"}}>Country Code:</label>
              </div>
              <div style = {{display : 'flex', flexDirection : 'column', padding: '20px'}}>
                  <input onChange = {(e) => handleCity(e)} placeholder = {"Enter City Name"} style={{ backgroundColor: "white", color: "black", padding: "5px", borderRadius: "5px", marginBottom: "5px", border: "none", height : '20px', textAlign: "center"}} />
                  <input onChange = {(e) => setCountryCode(e.target.value)} placeholder = {"Enter Country Code"} style={{ backgroundColor: "white", color: "black", padding: "5px", borderRadius: "5px", marginBottom: "5px", border: "none", height : '20px', textAlign: "center" }} />
              </div>
            </div>
            <div style = {{display : 'flex', flexDirection : 'column', justifyContent : 'center', alignItems : 'center'}}>
              <Link to = {countryCode ? `/LearnMore/Address/Type_2/${city}/${countryCode}` : `/LearnMore/1/${city}`} style={{ backgroundImage: "linear-gradient(60deg, #000000, #2e2e2e, black)", color: "white", borderRadius: "5px", marginBottom: "5px", width: "75px", textAlign: "center", border : 'none', fontSize : '18px', height : '26px', textDecoration : 'none', display : 'flex', justifyContent : 'center', alignItems : 'center'}}> Submit </Link>
              <button style={{ backgroundImage: "linear-gradient(60deg, #000000, #2e2e2e, black)", color: "white", padding: "5px", borderRadius: "5px", marginBottom: "5px", textAlign: "center", border : 'none', fontSize : '18px', textDecoration : 'none', display : 'flex', justifyContent : 'center', alignItems : 'center', fontFamily: 'Garamond', height : '26px', width: '75px'}}> Add </button>
            </div>
          </div>
        </li>
        <li>
          <div style = {{display : 'flex', justifyContent : 'center', alignItems : 'center', borderRadius: '20px', width: 'auto'}}>
            <div style = {{display : 'flex', justifyContent : 'center', alignItems : 'center'}}>
              <div style = {{display : 'flex', flexDirection : 'column'}}>
                  <label id = "latitude" htmlFor="latitude" style={{ backgroundImage: "linear-gradient(60deg, #000000, #2e2e2e, black)", color: "white", padding: "5px", borderRadius: "5px", marginBottom: "5px", width: "130px", textAlign: "center"}}>Latitude:</label>
                  <label id = "longitude" htmlFor="longitude" style={{ backgroundImage: "linear-gradient(60deg, #000000, #2e2e2e, black)", color: "white", padding: "5px", borderRadius: "5px", marginBottom: "5px", width: "130px", textAlign: "center" }}>Longitude:</label>
              </div>
              <div style = {{display : 'flex', flexDirection : 'column', padding: '20px'}}>
                  <input onChange = {(e) => setLatitude(e.target.value)} placeholder = {currentLocation.latitude} style={{ backgroundColor: "white", color: "black", padding: "5px", borderRadius: "5px", marginBottom: "5px", border: "none", height : '20px', textAlign: "center" }} />
                  <input onChange = {(e) => setLongitude(e.target.value)} placeholder = {currentLocation.longitude} style={{ backgroundColor: "white", color: "black", padding: "5px", borderRadius: "5px", marginBottom: "5px", border: "none", height : '20px', textAlign: "center" }} />
              </div>
            </div>
            <div style = {{display : 'flex', flexDirection : 'column', justifyContent : 'center', alignItems : 'center'}}>
              <Link to = {`/LearnMore/${latitude}/${longitude}`} style={{ backgroundImage: "linear-gradient(60deg, #000000, #2e2e2e, black)", color: "white", borderRadius: "5px", marginBottom: "5px", width: "75px", textAlign: "center", border : 'none', fontSize : '18px', height : '26px', textDecoration : 'none', display : 'flex', justifyContent : 'center', alignItems : 'center'}}> Submit </Link>
              <button onClick = {() => {const object = {latitude : latitude, longitude : longitude, display : true, name : "null", countryCode : "null"} ; setArray([...array, object])}} style={{ backgroundImage: "linear-gradient(60deg, #000000, #2e2e2e, black)", color: "white", padding: "5px", borderRadius: "5px", marginBottom: "5px", textAlign: "center", border : 'none', fontSize : '18px', textDecoration : 'none', display : 'flex', justifyContent : 'center', alignItems : 'center', fontFamily: 'Garamond', height : '26px', width: '75px'}}> Add </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}
