import React from 'react';
import { useState, useEffect } from 'react';
import Weather from './weatherOne';
import Loaded from '../Loaded/Loaded';

const API_key = 'f970789f0b97c5c02aa8bd273bd3a60a';
const API_endpoint = 'https://api.openweathermap.org/data/2.5/weather?q=';

export default function WeatherTwo({ name, display, setCurrentLatitudeLongitude, setLatitudeOriginal, setLongitudeOriginal, countryCode, index }) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [latitude, setLatitude] = useState(51.5085);
    const [longitude, setLongitude] = useState(-0.1257);
    const [finish, setFinish] = useState(false);
    const [day, setDay] = useState(()=> (index % 4 === 0 || index % 4 === 1) ? 'night' : 'day')


    const url = `${API_endpoint}${name},${countryCode}&appid=${API_key}`;

    useEffect(() => {
        const interval = setInterval(() => {
            setIsLoading(true);
            fetch(url)
                .then((resp) => resp.json())
                .then((resp) => {
                    setData(resp);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                    setIsLoading(false);
                });
        }, 10000);
        return () => clearInterval(interval);
    }, [name, countryCode]);

    useEffect(() => {
        if (!isLoading && data) {
            const { coord } = data;
            if (coord) {
                const { lon, lat } = coord;
                setLatitude(lat);
                setLongitude(lon);
                setFinish(true);
            }
        }
    }, [data, isLoading]);

    return (
        <div>
            {finish ? <div className={`weather ${`weather-${day}`}`} style ={{opacity : '0.9'}} onClick ={() => { setCurrentLatitudeLongitude([latitude, longitude]); setLatitudeOriginal(latitude); setLongitudeOriginal(longitude); }} index={index}> <Loaded latitude = {latitude} longitude = {longitude} data={data} setData={setData} day = {day} setDay = {setDay}/></div> :
                <div style={{ width: '36px', height: '36px', borderRadius: '45%', border: '4px solid #f3f3f3', borderTop: '4px solid #3498db', animation: 'spin 1s linear infinite' }}></div>}
            <style>
                {`@keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }`}
            </style>
        </div>
    )
}
