import React, { useEffect } from 'react';
import { useState } from 'react';
import './Loaded.css';
import { createContext } from 'react';
import SunsetSunrise from '../sunsetSunrise/sunsetSunrise';

export const UserLatitudeContext = createContext();
export const UserLongitudeContext = createContext();

export default function Loaded({ data, setData, day, setDay, latitude, longitude }) {
    const { weather, main, sys, timezone, name } = data;

    useEffect(() => {
        setData(data);
    }, [data]);

    const weatherObject = weather[0];
    const { icon } = weatherObject;
    const { country } = sys;
    const { temp, temp_min, temp_max } = main;

    const [roundedTemp, setRoundedTemp] = useState(Math.round(temp - 273.15));
    const [roundedTempMin, setRoundedTempMin] = useState(Math.round(temp_min - 273.15));
    const [roundedTempMax, setRoundedTempMax] = useState(Math.round(temp_max - 273.15));

    return (
        <div className='loaded-container' style={{ fontSize: '39.6px' }}>
            <div style={{ color: 'white', fontSize: '39.6px', fontWeight: 'bold', fontFamily: 'Garamond', height: '45px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {name}, {country}
            </div>
            <div className='Grid-container'>
                <img alt='weather-icon' className='weather-icon' src={require(`../../images/${icon}.png`)} style={{ width: '126px', height: '126px' }} />
                <div className='temp'>{roundedTemp + '°'}</div>
                <div className='temp-min'>{roundedTempMin + '°'}</div>
                <div className='temp-max'>{roundedTempMax + '°'}</div>
            </div>
            <div className='tapered-line' style={{ height: '0.9px' }}></div>
            <UserLatitudeContext.Provider value={latitude}>
                <UserLongitudeContext.Provider value={longitude}>
                    <SunsetSunrise sys={sys} timezone={timezone} day={day} setDay={setDay} />
                </UserLongitudeContext.Provider>
            </UserLatitudeContext.Provider>
        </div>
    );
}
