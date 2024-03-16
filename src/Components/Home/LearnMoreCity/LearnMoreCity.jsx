import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import CityMap from './CityMap';
import WeatherDetails from './WeatherDetails';
import Menu from './Menu';
import New from './New';

const API_key = 'f970789f0b97c5c02aa8bd273bd3a60a';
const API_endpoint = 'https://api.openweathermap.org/data/2.5/weather?q=';


export const UserCityContext = createContext();
export const UserCountryContext = createContext();
export const UserLatitudeContext = createContext();
export const UserLongitudeContext = createContext();

export default function LearnMoreCity() {
    const path = window.location.pathname;
    const substrings = path.split('/');
    const [address, setAddress] = useState(substrings[5]);
    const [countryCode, setCountryCode] = useState(substrings[6]);
    const [city, setCity] = useState(substrings[5]);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [latitude, setLatitude] = useState(51.5085);
    const [longitude, setLongitude] = useState(-0.1257);
    const [finish , setFinish] = useState(false)

    const url = `${API_endpoint}${address},${countryCode}&appid=${API_key}`;

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
    }, [address, countryCode, url]);

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
            <New/>
            <Menu address={address} countryCode={countryCode} setAddress={setAddress} setCountryCode={setCountryCode} latitude={latitude} longitude={longitude} setLatitude={setLatitude} setLongitude={setLongitude} setIsLoading={setIsLoading} setFinish={setFinish}/>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div>
                <UserCityContext.Provider value={city}>
                    <UserCountryContext.Provider value={countryCode}>
                        {finish ? (
                            <CityMap latitude={latitude} longitude={longitude} />
                        ) : (
                            <p>Loading...</p>
                        )}
                    </UserCountryContext.Provider>
                </UserCityContext.Provider>
            </div>
                {finish ? (
                    <div>
                        <UserLatitudeContext.Provider value={latitude}>
                            <UserLongitudeContext.Provider value={longitude}>
                                <WeatherDetails data={data}  setData={setData}/>
                            </UserLongitudeContext.Provider>
                        </UserLatitudeContext.Provider>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
        </div>
        </div>
    );
}
