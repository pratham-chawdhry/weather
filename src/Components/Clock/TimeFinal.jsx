import React, { useCallback, useEffect } from 'react'
import { useState } from 'react';
import Clock from './Clock';
import './TimeFinal.css'
import Pic from '../../images/Pic.png'


export default function TimeFinal({timezone, feels_like, visibility, all, description, dt, sunrise, sunset, setTime}) {
    const [date, setDate] = useState(Math.floor(new Date().getTime()));
    const [timezoneOffset, setTimezoneOffset] = useState(0);
    const [dateParts, setDateParts] = useState([]);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setDate(Math.floor(new Date().getTime()/1000));
        },500)

        return () => clearInterval(interval);
    },[])

    const [dateNow, setDateNow] = useState(new Date());
    useEffect(() => {
      setTimezoneOffset(new Date().getTimezoneOffset()*60);
    }, [timezone])

  const [timeString, setTimeString] = useState('');
  const [dateString, setDateString] = useState('');

  useEffect(() => {
    setTimeString(new Date((date + timezone + timezoneOffset)*1000).toLocaleTimeString())
    setDateString(new Date((date + timezone + timezoneOffset)*1000).toLocaleDateString())
  }, [timezoneOffset, timezone, date])

  const [parts, setParts] = useState([]);

  useEffect(() => {
    setParts(timeString.split(/[:/\s]+/));
  },[timeString])

  useEffect(() => {
    setDateParts(dateString.split('/'));
  },[dateString])

  const handleDay = ({day}) => {
    if (parseInt(day)% 10 === 1){
      return `st`
    }
    if (parseInt(day)% 10 === 2){
      return `nd`
    }
    if (parseInt(day)% 10 === 3){
      return `rd`
    }
    else {
      return `th`
    }
  }
  const handleMonth = ({month}) => {
    if (month === '1') {
      return 'January'
    }
    if (month === '2') {
      return 'February'
    }
    if (month === '3') {
      return 'March'
    }
    if (month === '4') {
      return 'April'
    }
    if (month === '5') {
      return 'May'
    }
    if (month === '6') {
      return 'June'
    }
    if (month === '7') {
      return 'July'
    }
    if (month === '8') {
      return 'August'
    }
    if (month === '9') {
      return 'September'
    }
    if (month === '10') {
      return 'October'
    }
    if (month === '11') {
      return 'November'
    }
    if (month === '12') {
      return 'December'
    }
  }

  useEffect(() => {
    if (date >= sunrise && date <= sunset) {
      setTime('day')
    } else {
      setTime('night')
    }
  }, [date])

  return (
    <div style = {{display : 'flex', flexDirection : 'column', justifyContent : 'center', alignItems : 'center'}}>
      <div>
        <Clock timeString 
        = {timeString}/>
      </div> 
      <div style={{backgroundImage: `url(${Pic})`, height : '350px', width : '360px', marginTop : '10px', borderRadius : '20px', color : 'white', padding : '0px'}}>
        <div style = {{border: '2px solid black', margin: '0px', height: '200px', width : '360px', borderRadius : '20px'}}>
        </div>
        <div style = {{display : 'flex', flexDirection : 'column', justifyContent : 'left', marginTop : '40px'}}>
        <div style = {{marginBottom : '10px', marginLeft : '20px'}}>
          <div style = {{display : 'flex', fontFamily : 'Garamond', fontSize : '30px', alignItems : 'flex-end'}}>
            <div style = {{display : 'flex', justifyContent : 'center', alignItems : 'center'}}>
                <div style = {{fontSize : '30px', marginRight : '5px'}}><span style = {{fontWeight : 'italic', fontSize : '40px'}}>{parts[0] < 10 ? `0${parts[0]}` : parts[0]}</span></div>
                <div style = {{fontSize : '30px', marginRight : '5px'}}>:</div>
                <div style = {{fontSize : '30px', marginRight : '5px'}}><span style = {{fontWeight : 'italic', fontSize : '40px'}}>{parts[1]}</span></div>
                <div style = {{fontSize : '30px', marginRight : '5px'}}>:</div>
                <div style = {{fontSize : '30px', marginRight : '5px'}}><span style = {{fontWeight : 'italic', fontSize : '40px'}}>{parts[2]}</span></div>
              </div>
            <div>{parts[3]}</div>
          </div>
          <div style = {{display : 'flex', alignItems: 'flex-end' ,fontFamily : 'Garamond', fontSize : '20px'}}>
            <div style = {{fontSize : '30px', marginRight : '10px'}}> <span  style = {{fontWeight : 'italic', fontSize : '40px'}}>{dateParts[1]}</span>{handleDay({day : dateParts[1]})}</div>
            <div style = {{fontSize : '30px', marginRight : '10px', marginBottom: '3px'}}> {handleMonth({month : dateParts[0]})}</div>
            <div style = {{fontSize : '30px'}}> <span style = {{fontWeight : 'italic', fontSize : '40px'}}> {dateParts[2]}</span></div>
          </div>
        </div>
        </div>
        </div>
    </div>
  )
}
