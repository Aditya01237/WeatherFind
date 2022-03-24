////cdfd977db7b1cfa0e7271c8438da35b0

//api.openweathermap.org/data/2.5/weather?q=jaipur&appid=cdfd977db7b1cfa0e7271c8438da35b0

import React, { useEffect, useState } from 'react'
import "./style.css"
import WeatherCard from './weatherCard'

const Whether = () => {

    const [searchValue,setsearchValue] = useState("sardarshahar")
    const [tempInfo,settempInfo] = useState({})
    const getWeatherInfo = async() => {
        try {
            let url =`http://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=cdfd977db7b1cfa0e7271c8438da35b0`

            let res = await fetch(url)
            let data = await res.json()
            
            const {temp,humidity,pressure} = data.main
            const{main:weathermood} = data.weather[0]
            const{name} = data
            const {speed} = data.wind
            const {country,sunset} = data.sys

            const myNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset,
            }

            settempInfo(myNewWeatherInfo)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() =>{
        getWeatherInfo()        
    },[])

  return (
      <>
        <div className='wrap'>
            <div className='search'>
                <input type="search"
                placeholder='search...'
                autoFocus
                id='search'
                className='searchTerm'
                value={searchValue}
                onChange={(e) => {
                    setsearchValue(e.target.value)
                }}
                />
                <button className='searchButton' type='button' onClick={getWeatherInfo}>Search</button>
            </div>
        </div>

        {/* Our temp card */}

        <WeatherCard tempInfo = {tempInfo}/>

      </>
  )
}

export default Whether