import React, {useEffect, useState } from 'react'
import LoadingFinal from '../LoadingFinal/LoadingFinal'

const API_endpoint = 'https://api.openweathermap.org/data/2.5/weather?'
const API_key = 'f970789f0b97c5c02aa8bd273bd3a60a'

export default function WeatherDetails({latitude, longitude, setLatitude, setLongitude, isLoading, setIsLoading}) {
    const [data, setData] = useState();

    const url = `${API_endpoint}lat=${latitude}&lon=${longitude}&appid=${API_key}`
    console.log(url);

    useEffect(() => {
        const interval = setInterval(() => {
            fetch(url)
                .then((resp) => resp.json())
                .then((resp) => {
                  setData(resp);
                  setIsLoading(false);
                })
        }, 10000)
        return () => clearInterval(interval);
    })

    console.log("fetch", isLoading);

  return (
    <div>
      {isLoading ? <div>Loading...</div> : <LoadingFinal data={data} setData={setData} latitude={latitude} longitude={longitude}/>}
    </div>
  )
}
