import React, { useState, useEffect } from 'react';
import Time from '../Time/Time';

export default function SunsetSunrise({ sys, timezone, day, setDay}) {
  const { sunrise, sunset } = sys;

  const timezoneOffset = new Date().getTimezoneOffset()*60;

  const [sunriseTime, setSunriseTime] = useState(new Date((sunrise + timezoneOffset + timezone) * 1000));
  const [sunsetTime, setSunsetTime] = useState(new Date((sunset + timezoneOffset + timezone) * 1000));

  return (
    <>
    <div className='Sunset-Sunrise'>
    <div>
        <img src = {require(`../../images/Sunrise.png`)} style = {{width: '100px', height: '100px'}}/>
    </div>
    <div>
        <img src = {require(`../../images/Sunset.png`)} style = {{width: '100px', height: '100px'}}/>
    </div>
  </div>
  <div className='Sunset-Sunrise'>
    <div style = {{fontSize : '20px'}}>
        {sunriseTime.toLocaleTimeString()}
    </div>
    <div style = {{fontSize : '20px'}}>
        {sunsetTime.toLocaleTimeString()}
    </div>
  </div>
  <Time timezone = {timezone} day = {day} setDay = {setDay} sunrise = {sunrise} sunset = {sunset}/>
  </>
  );
}
