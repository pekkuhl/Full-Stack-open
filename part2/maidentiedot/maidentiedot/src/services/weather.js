import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY

console.log(api_key)

const getWeather = (country) => {
    console.log(api_key)
    console.log("--->", country)
    return axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${country.capital}?unitGroup=metric&key=${api_key}`)
}

export default { getWeather }