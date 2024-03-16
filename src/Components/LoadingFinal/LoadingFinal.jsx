import React from 'react'
import {useState} from 'react'
import './LoadingFinal.css'
import { CountryCodeArray } from '../data'
import SunriseSunsetFinal from './SunriseSunsetFinal'
import Additional from './Additional'
import TimeFinal from '../Clock/TimeFinal'

export default function LoadingFinal({data, setData, latitude, longitude, setLatitude, setLongitude}) {
    const {weather, main, visibility, wind, clouds, dt, sys, timezone, name} = data
    const {description, icon} = weather[0]
    const {country, sunrise, sunset} = sys;
    const {temp, feels_like, temp_min, temp_max, pressure, humidity} = main;
    const {all} = clouds;

    const [time, setTime] = useState('night');

    const handleCountry = () => {
      const newArray = CountryCodeArray.filter(({name, code}) => {
        return code === country;
      })
      const {name} = newArray[0];
      return `${name}`
    }

  return (
    <div style = {{display : 'flex', fontFamily : 'Garamond'}}>
      <div className={`Weather-Dashboard weather-${time}`}>
          <div className='cityName'>
          {name}, { country ? (`${handleCountry()}`) : (`Country Name : - `)}
          </div>
          <div className='Grid-container'>
            <div className='temp'> {Math.round(temp - 273.15) + '°'}</div>
            <div className='temp-max'> {Math.round(temp_max - 273.15) + '°'}</div>
            <div className='temp-min'> {Math.round(temp_min - 273.15) + '°'}</div>
            <img className = 'weather-icon' alt = 'weather-icon' src={require(`../../images/${icon}.png`)}/>
          </div>
          <div style = {{margin: '10px', marginTop : '40px'}}>
            <div>
              <SunriseSunsetFinal sys = {sys} timezone = {timezone}/>
            </div>
            <div>
              <Additional pressure = {pressure} humidity = {humidity} wind = {wind}/>
            </div>
          </div>
      </div>
      <div className='Time'>
        <TimeFinal timezone = {timezone} feels_like = {feels_like} visibility = {visibility} all = {all} description = {description} dt = {dt} sunrise = {sunrise} sunset = {sunset} setTime = {setTime} latitude = {latitude} longitude = {longitude}/>
      </div>
    </div>
  )
}
