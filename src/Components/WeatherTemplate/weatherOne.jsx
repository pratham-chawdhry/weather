import React from 'react'
import { useState } from 'react';
import Loaded from '../Loaded/Loaded';

export default function WeatherOne({data, latitude, longitude, onClick, index, loading, setData}) {
  const [day, setDay] = useState(()=> (index % 4 === 0 || index % 4 === 1) ? 'night' : 'day')

  return (
    <div className={`weather ${`weather-${day}`}`} style ={{opacity : '0.9'}} onClick = {onClick}>
      <Loaded latitude = {latitude} longitude = {longitude} data={data} setData={setData} day = {day} setDay = {setDay}/>
    </div>
  )
}
