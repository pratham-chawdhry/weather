import React from 'react'
import './Additional.css'

export default function Additional({pressure, humidity, wind}) {
    const {speed, deg} = wind
  return (
    <div style = {{marginTop : '30px', display : 'flex', flexDirection : 'column', justifyContent : 'center', alignItems : 'center', margin: '20px', padding: '20px'}}>
      <div className='Flex-Container'>
        <div className='Flex-Container-new'>
            <img alt = 'pressure' src = {require(`../../images/Pressure.png`)} style = {{width: '100px', height: '100px'}}/>
            <div style = {{fontSize : '20px', marginTop : '10px'}}>{pressure/1000} mBar</div>
        </div>
        <div className='Flex-Container-new'>
            <img alt = 'humidity' src = {require(`../../images/Humidity.png`)} style = {{width: '100px', height: '100px'}}/>
            <div style = {{fontSize : '20px', marginTop : '10px'}}>{humidity}%</div>
        </div>
        <div className='Flex-Container-new'>
            <img alt = 'wind' src = {require(`../../images/Wind.png`)} style = {{width: '100px', height: '100px'}}/>
            <div style = {{fontSize : '20px', marginTop : '10px'}}>{speed} m/s at {deg}°</div>
        </div>
      </div>
    </div>
  )
}
