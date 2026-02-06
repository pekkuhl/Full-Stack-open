




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
        const languages = []
        for (const lang in showBtnCountry.languages) {
            languages.push(showBtnCountry.languages[lang])
        }

        return (
        <div>
            <h1> {showBtnCountry.name.common} </h1>
            <p>Capital {showBtnCountry.capital}</p>
            <p>Area {showBtnCountry.area}</p>
            <h3>Languages</h3>
            <ul>
                {languages.map(lang => (<li> {lang} </li>))}
            </ul>
            <img src={showBtnCountry.flags.png} alt={showBtnCountry.flags.alt} />
            <div>
            <button onClick={handleGoBack}> go back </button>
            </div>
        </div>
    )
    }

    if (selectedCountries.length === 0) {
        return (
            <p>Search for countries</p>
        )
    }

    if (selectedCountries.length > 10) {
        return (
            <p>Too many matches, specify another filter</p> 
        )
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
        const languages = []
        for (const language in country.languages) {
            languages.push(country.languages[language])
        }

        return (
            <div>
            <h1> {country.name.common} </h1>
            <p>Capital {country.capital}</p>
            <p>Area {country.area}</p>
            <h3>Languages</h3>
            <ul>
                {languages.map(lang => (<li key={lang}> {lang} </li>))}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} />
            </div>
            
        )
    }
        
}

export default CountryInfo