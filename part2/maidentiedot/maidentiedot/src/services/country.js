import axios from 'axios'

const allCountriesUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const oneCountryUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name'

const getCountries = () => {
    return axios.get(allCountriesUrl)
}

const getCountry = (searchTerm) => {
    return axios.get(`${baseurl}/${searchTerm}`)
}

export default { getCountries, getCountry }