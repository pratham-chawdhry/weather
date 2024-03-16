import React from 'react'
import { useState } from 'react'

export default function SunriseSunsetFinal({ sys, timezone, day, setDay}) {
    const { sunrise, sunset } = sys;

    const timezoneOffset = new Date().getTimezoneOffset()*60;
  
    const [sunriseTime, setSunriseTime] = useState(new Date((sunrise + timezoneOffset + timezone) * 1000));
    const [sunsetTime, setSunsetTime] = useState(new Date((sunset + timezoneOffset + timezone) * 1000));
  
    return (
      <div style = {{display : 'flex', flexDirection : 'column', justifyContent : 'center', alignItems : 'center'}}>
      <div className='Sunset-Sunrise'>
      <div>
          <img alt = 'sunrise' src = {require(`../../images/Sunrise.png`)} style = {{width: '100px', height: '100px', paddingRight : '50px'}}/>
      </div>
      <div>
          <img alt = 'sunset' src = {require(`../../images/Sunset.png`)} style = {{width: '100px', height: '100px', paddingLeft : '50px'}}/>
      </div>
    </div>
    <div className='Sunset-Sunrise'>
      <div style = {{fontSize : '20px', paddingRight : '50px'}}>
          {sunriseTime.toLocaleTimeString()}
      </div>
      <div style = {{fontSize : '20px', paddingLeft : '50px'}}>
          {sunsetTime.toLocaleTimeString()}
      </div>
    </div>
    </div>
    );
}
