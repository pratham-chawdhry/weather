import React, { useState } from 'react'
import { useEffect } from 'react';
import './weather.css'
import Loaded from '../Loaded/Loaded';

const API_endpoint = 'https://api.openweathermap.org/data/2.5/weather?'
const API_key = 'f970789f0b97c5c02aa8bd273bd3a60a'

export default function Weather({latitude, longitude, onClick, index}) {
  const [data, setData] = useState({});
  const [loading, setIsLoading] = useState(true);
  const [day, setDay] = useState(()=> (index % 4 === 0 || index % 4 === 1) ? 'night' : 'day');

  const url = `${API_endpoint}lat=${latitude}&lon=${longitude}&appid=${API_key}`

  if (index === -1){
    console.log("Url", url);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(url)
          .then((resp) => resp.json())
          .then((resp) => {
            setData(resp);
            setIsLoading(false);
          })
    }, 10000)
    return () => clearInterval(interval);
  },[latitude, longitude, url]);
  

  return (
    <div>
    {loading ? (<div style = {{width : '40px', height : '40px', borderRadius: '50%', border : '4px solid #f3f3f3', borderTop : '4px solid #3498db', animation : 'spin 1s linear infinite'}} ></div>) : 
    <div className={`weather ${`weather-${day}`}`} style ={{opacity : '0.9'}} onClick = {onClick}>
      {loading ? <div style = {{alignItems: 'center', justifyContent: 'center', display: 'grid'}} onClick = {onClick}><div onClick = {onClick}>latitude : {latitude}</div> <div onClick = {onClick}> longitude : {longitude}</div></div> : 
      <Loaded latitude = {latitude} longitude = {longitude} data={data} setData={setData} day = {day} setDay = {setDay}/>}
    </div>}
    <style>
      {`@keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }`}
    </style>
    </div>
  )
}