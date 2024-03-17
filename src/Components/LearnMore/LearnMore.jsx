import React from 'react'
import CityMap from '../CityMap/CityMap'
import { useState } from 'react';
import WeatherDetails from '../WeatherDetails/WeatherDetails';
import Menu from './Menu';

export default function LearnMore() {
    const path = window.location.pathname;

    const substrings = path.split('/');
    const [latitude, setLatitude] = useState(substrings[3]);
    const [longitude, setLongitude] = useState(substrings[4]);
    const [isLoading, setIsLoading] = useState(true);

  return (
    <div>
        <div style = {{transform: 'scale(0.9)', transformOrigin: 'top left'}}>
        <Menu latitude = {latitude} longitude = {longitude} setLatitude = {setLatitude} setLongitude = {setLongitude}/>
        </div>
        <div style = {{display: 'flex', justifyContent: 'center', transform: 'scale(0.9)', transformOrigin: 'top center'}}>
            <div>
                <CityMap latitude = {latitude} longitude = {longitude} setLatitude = {setLatitude} setLongitude = {setLongitude} setIsLoading = {setIsLoading}/>
            </div>
            <div>
                <WeatherDetails latitude = {latitude} longitude = {longitude} setLatitude = {setLatitude} setLongitude = {setLongitude} isLoading = {isLoading} setIsLoading = {setIsLoading}/>
            </div>
        </div>
    </div>
  )
}
