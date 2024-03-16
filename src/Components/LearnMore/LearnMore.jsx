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
        <Menu latitude = {latitude} longitude = {longitude} setLatitude = {setLatitude} setLongitude = {setLongitude}/>
        <div style = {{display: 'flex', justifyContent: 'center'}}>
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
