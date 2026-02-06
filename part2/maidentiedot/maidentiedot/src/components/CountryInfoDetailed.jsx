import WeatherInfo from "./WeatherInfo"

const CountryInfoDetailed = ({country, handleGoBack}) => {
    const languages = []
    for (const lang in country.languages) {
        languages.push(country.languages[lang])
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
            <WeatherInfo country={country}/>
            <div>
                {handleGoBack ? (<button onClick={handleGoBack}> go back </button>) : <p></p>}
            </div>
        </div>
    )

}


export default CountryInfoDetailed