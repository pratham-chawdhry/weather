import React from 'react'
import { useState } from 'react';
import Loaded from '../Loaded/Loaded';

export default function WeatherOne({data, latitude, longitude, onClick, index, loading, setData}) {
  const [day, setDay] = useState(()=> (index % 4 === 0 || index % 4 === 1) ? 'night' : 'day')

  return (
    <div>
    {loading ? (<div style = {{width : '36px', height : '36px', borderRadius: '45%', border : '4px solid #f3f3f3', borderTop : '4px solid #3498db', animation : 'spin 1s linear infinite'}} ></div>) : 
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
