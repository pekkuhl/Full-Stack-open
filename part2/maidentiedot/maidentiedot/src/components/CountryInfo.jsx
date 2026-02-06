import CountryInfoDetailed from "./CountryInfoDetailed"

const CountryInfo = ({selectedCountries, showBtnCountry, setShowBtnCountry}) => {

    const handleShowBtn = (e) => {
    const filteredCountry = selectedCountries.filter(country => country.name.common === e.target.id)
    setShowBtnCountry(filteredCountry[0])
    console.log(showBtnCountry)
  }

  const handleGoBack = () => {
    setShowBtnCountry(null)
  }

    if (showBtnCountry) {
        return ( <CountryInfoDetailed country={showBtnCountry} handleGoBack={handleGoBack} /> )
    }

    if (selectedCountries.length === 0) {
        return (<p>Search for countries</p>)
    }

    if (selectedCountries.length > 10) {
        return ( <p>Too many matches, specify another filter</p> )
    }

    if (selectedCountries.length <= 10 && selectedCountries.length > 1) {
        return (
            <ul>
                {selectedCountries.map(country => (
                    <li key={country.name.common}> {country.name.common} <button id={country.name.common} onClick={handleShowBtn}> Show </button> </li>
                ))}
            </ul>
    )}

    if(selectedCountries.length === 1) {
        const country = selectedCountries[0]
        return ( <CountryInfoDetailed country={country} showBtnCountry={showBtnCountry}/>)
    }
        
}

export default CountryInfo