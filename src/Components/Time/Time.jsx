import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { UserLatitudeContext } from '../Loaded/Loaded'
import { UserLongitudeContext } from '../Loaded/Loaded'
import {Link} from 'react-router-dom'
import LearnMore from '../LearnMore/LearnMore';
import './Time.css';

export default function Time({timezone, day, setDay, sunrise, sunset}) {
    const [date, setDate] = useState(new Date()*1000);

    // const timezoneOffset = new Date().getTimezoneOffset()*60;
    // const timeLag = timezoneOffset*1000 + timezone*1000;
    const [timeLag, setTimeLag] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setDate(new Date()*1000);
        }, 500)
        return () => clearInterval(interval);
    })

    useEffect(() => {
        const timezoneOffset = new Date().getTimezoneOffset()*60;
        setTimeLag(timezoneOffset*1000 + timezone*1000);
        const newDate = Math.floor(date/(1000*1000));
        if (newDate >= sunrise && newDate <= sunset) {
            setDay('day');
        } else {
            setDay('night');
    }},[date, sunrise, sunset, timezone, setDay]);

    const userLatitudeContext = useContext(UserLatitudeContext); 
    const userLongitudeContext = useContext(UserLongitudeContext);

  return (
  <div style={{ color: 'white', display: 'flex', justifyContent: 'center', gap : '45px', alignItems: 'center', marginTop: '18px', fontSize: '31.5px' }}>
    <div>{new Date(date / 1000 + timeLag).toLocaleTimeString()}</div>
    <div style={{display : 'flex', justifyContent : 'center', alignItems : 'center', fontFamily: 'cursive'}}>
    <Link to={`/LearnMore/${userLatitudeContext}/${userLongitudeContext}`} className={`weather${day}`} style={{ textDecoration: 'none', height: '31.5px', fontSize: '18px', width: '108px', fontFamily: 'Garamond', borderRadius: '4.5px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Learn More</Link>
    <button style={{ textDecoration: 'none', height: '31.5px', fontSize: '18px', width: '108px', fontFamily: 'Garamond', borderRadius: '4.5px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: 'none', backgroundColor: '#fc3e28', color: 'white'}}>Remove</button>
    </div>
  </div>
  )
}
