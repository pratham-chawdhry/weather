import React from 'react'
import LoadingFinal from '../../LoadingFinal/LoadingFinal';

export default function WeatherDetails({data, setData}) {
  return (
    <div>
      <LoadingFinal data={data} setData={setData}/>
    </div>
  )
}
