import React from 'react'
import { useState, useEffect } from 'react';
import Weather from './weatherOne';

const API_key = 'f970789f0b97c5c02aa8bd273bd3a60a';
const API_endpoint = 'https://api.openweathermap.org/data/2.5/weather?q=';

export default function WeatherTwo({name, display,setCurrentLatitudeLongitude, setLatitudeOriginal, setLongitudeOriginal, countryCode, index}) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [latitude, setLatitude] = useState(51.5085);
    const [longitude, setLongitude] = useState(-0.1257);
    const [finish , setFinish] = useState(false)

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
                setFinish(true)
            }
        }
    }, [data, isLoading]);

  return (
    <div>
        {finish ? <Weather data={data} setData={setData} latitude={latitude} longitude={longitude} onClick={() => {setCurrentLatitudeLongitude([latitude, longitude]); setLatitudeOriginal(latitude); setLongitudeOriginal(longitude);}} index = {index}/> : <div>Loading...</div>}
    </div>
  )
}
