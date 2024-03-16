import React, { useEffect } from 'react'
import './Home.css'
import { useState } from 'react'
import Map from './Map/Map'
import {Link } from 'react-router-dom'
import Background from '../../images/Hello.jpg'

export default function Home() {    
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

    console.log(window.innerWidth, window.innerHeight);
  return (
    <div style = {{display : 'flex', backgroundImage : `url(${Background})`, backgroundRepeat: "no-repeat", backgroundPosition: "400px top"}}>
      <div>
        <Map/>
      </div>
      <div style={{display : 'flex', flexDirection : 'column', justifyContent : 'center', alignItems : 'center'}}>
        {/* <div style={{backgroundImage: `url(${Logo})`, height: '100px', width: '100px'}}></div> */}
        <div className='Home' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: '50px', opacity: '0.8', height: '550px'}} >
          <div  className='New' style = {{display : 'flex', flexDirection : 'column', justifyContent : 'center', alignItems : 'center', height : '250px', borderRadius: '20px', marginBottom: '100px'}}>
            <div style = {{display : 'flex', justifyContent : 'center', alignItems : 'center'}}>
              <div className='Flex-Container' style = {{display : 'flex', flexDirection : 'column', paddingLeft: '20px', marginLeft: '10px'}}>
                  <label htmlFor="latitude" style={{ backgroundColor: "black", color: "white", padding: "5px", borderRadius: "5px", marginBottom: "5px", width: "130px", textAlign: "center"}}>Latitude:</label>
                  <label htmlFor="longitude" style={{ backgroundColor: "black", color: "white", padding: "5px", borderRadius: "5px", marginBottom: "5px", width: "130px", textAlign: "center" }}>Longitude:</label>
              </div>
              <div className='Flex-Container' style = {{display : 'flex', flexDirection : 'column', padding: '20px'}}>
                  <input onChange = {(e) => setLatitude(e.target.value)} placeholder = {currentLocation.latitude} style={{ backgroundColor: "white", color: "black", padding: "5px", borderRadius: "5px", marginBottom: "5px", border: "none", height : '20px', textAlign: "center" }} />
                  <input onChange = {(e) => setLongitude(e.target.value)} placeholder = {currentLocation.longitude} style={{ backgroundColor: "white", color: "black", padding: "5px", borderRadius: "5px", marginBottom: "5px", border: "none", height : '20px', textAlign: "center" }} />
              </div>
            </div>
            <div style = {{display : 'flex', justifyContent : 'center', alignItems : 'center', marginLeft: '150px'}}>
            <Link to = {`/LearnMore/${latitude}/${longitude}`} style={{ backgroundColor: "black", color: "white", padding: "5px", borderRadius: "5px", marginBottom: "5px", width: "75px", textAlign: "center", border : 'none', fontSize : '18px', height : '26px', textDecoration : 'none', marginRight : '150px'}}> Submit </Link>
            </div>
          </div>
          <div className='New' style = {{display : 'flex', flexDirection : 'column', justifyContent : 'center', alignItems : 'center', height : '250px', borderRadius: '20px'}}>
            <div style = {{display : 'flex', justifyContent : 'center', alignItems : 'center'}}>
              <div className='Flex-Container' style = {{display : 'flex', flexDirection : 'column', paddingLeft: '20px', marginLeft: '10px'}}>
                  <label htmlFor="latitude" style={{ backgroundColor: "black", color: "white", padding: "5px", borderRadius: "5px", marginBottom: "5px", width: "130px", textAlign: "center"}}>City Name:</label>
                  <label htmlFor="longitude" style={{ backgroundColor: "black", color: "white", padding: "5px", borderRadius: "5px", marginBottom: "5px", width: "130px", textAlign: "center"}}>Country Code:</label>
              </div>
              <div className='Flex-Container' style = {{display : 'flex', flexDirection : 'column', padding: '20px'}}>
                  <input onChange = {(e) => handleCity(e)} placeholder = {"Enter City Name"} style={{ backgroundColor: "white", color: "black", padding: "5px", borderRadius: "5px", marginBottom: "5px", border: "none", height : '20px', textAlign: "center"}} />
                  <input onChange = {(e) => setCountryCode(e.target.value)} placeholder = {"Enter Country Code"} style={{ backgroundColor: "white", color: "black", padding: "5px", borderRadius: "5px", marginBottom: "5px", border: "none", height : '20px', textAlign: "center" }} />
              </div>
            </div>
            <div style = {{display : 'flex', justifyContent : 'center', alignItems : 'center', marginLeft: '150px'}}>
              <Link to = {countryCode ? `/LearnMore/Address/Type_2/${city}/${countryCode}` : `/LearnMore/1/${city}`} style={{ backgroundColor: "black", color: "white", padding: "5px", borderRadius: "5px", marginBottom: "5px", width: "75px", textAlign: "center", border : 'none', fontSize : '18px', height : '26px', textDecoration : 'none', marginRight : '150px'}}> Submit </Link>
            </div>
          </div>
          <Link to = '/Menu/1' style={{ backgroundColor: "black", color: "white", padding: "5px", borderRadius: "5px", marginBottom: "5px", width: "75px", textAlign: "center", border : 'none', fontSize : '18px', height : '26px', textDecoration : 'none', marginTop : '40px'}}> Menu </Link>
        </div>
      </div>
    </div>
  )
}
