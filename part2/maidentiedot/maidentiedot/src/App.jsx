import { useEffect, useState } from 'react'
import SearchBar from './components/SearchBar'
import countryService from './services/country'
import CountryInfo from './components/CountryInfo'


function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [countries, setCountries] = useState([])
  const [selectedCountries, setSelectedCountries] = useState([])
  const [showBtnCountry, setShowBtnCountry] = useState(null)
 

   const allCountries = () => {
    countryService.getCountries()
    .then(res => setCountries(res.data))
  }

  useEffect(allCountries, [])


  const handleInputChange = (e) => {
    setSearchTerm(e.target.value)
    console.log(e.target.value)

    setSelectedCountries(countries.filter(country => country.name.common.toLowerCase().includes(searchTerm.toLocaleLowerCase())))
  }

  console.log(selectedCountries)

  selectedCountries.forEach(country => console.log(country.name.common))

 

  return (
    <div>
      <SearchBar onInputChange={handleInputChange} />
      <CountryInfo selectedCountries={selectedCountries}
      showBtnCountry={showBtnCountry}
      setShowBtnCountry={setShowBtnCountry}/>
    </div>
  )
}

export default App
