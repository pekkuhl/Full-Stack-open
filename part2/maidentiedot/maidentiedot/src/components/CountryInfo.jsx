




const CountryInfo = ({selectedCountries}) => {

    if (selectedCountries.length === 0) {
        return (
            <p>Search for countries</p>
        )
    }
    else if (selectedCountries.length > 10) {
        return (
            <p>Too many matches, specify another filter</p> 
        )
    }
    else if (selectedCountries.length <= 10 && selectedCountries.length > 1) {
        return (
            <ul>
                {selectedCountries.map(country => (
                    <li key={country.name.common}> {country.name.common} </li>
                ))}
            </ul>
    )}
    else if(selectedCountries.length === 1) {

        const country = selectedCountries[0]
        const languages = []
        for (const language in country.languages) {
            languages.push(country.languages[language])
        }
        console.log(languages)
        console.log(country)
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