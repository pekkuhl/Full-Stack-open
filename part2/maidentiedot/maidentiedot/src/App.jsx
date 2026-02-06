import { useEffect, useState } from 'react'
import SearchBar from './components/SearchBar'
import countryService from './services/country'
import CountryInfo from './components/CountryInfo'


function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [countries, setCountries] = useState([])
  const [selectedCountries, setSelectedCountries] = useState([])
  const [currentCountry, setCurrentCountry] = useState("")
 

   const allCountries = () => {
    countryService.getCountries()
    .then(res => setCountries(res.data))
  }

  useEffect(allCountries, [])


  const handleInputChange = (e) => {
    setSearchTerm(e.target.value)
    console.log(e.target.value)

    setSelectedCountries(countries.filter(country => country.name.common.toLowerCase().includes(e.target.value.toLocaleLowerCase())))
  }

  console.log(selectedCountries)

  selectedCountries.forEach(country => console.log(country.name.common))

  const handleShowBtn = (e) => {

  }

  return (
    <div>
      <SearchBar onInputChange={handleInputChange} />
      <CountryInfo selectedCountries={selectedCountries}/>
    </div>
  )
}

export default App
