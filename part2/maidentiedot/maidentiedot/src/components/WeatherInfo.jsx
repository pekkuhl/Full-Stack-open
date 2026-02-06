import { useEffect, useState } from "react"
import weatherService from '../services/weather'

const WeatherInfo = ({country}) => {
    const [weather, setWeather] = useState(null)

    const currentWeather = () => {
        weatherService.getWeather(country)
        .then(res => {
            setWeather(res.data)
            console.log("data...",weather) // weather on null??
            console.log(res.data) // ei ole null...
        })
        .catch(err => console.log("error happened", err))
    }

    console.log("weather",weather)

    useEffect(currentWeather, [])

    if (weather !== null) {
        return (
            <div>
                <h3>Weather in {country.capital}</h3>
                <p> Temperature: {weather.currentConditions.temp} Celsius</p>
                <p> Wind: {weather.currentConditions.windspeed} m/s</p>
            </div>
        )
    }

}

export default WeatherInfo