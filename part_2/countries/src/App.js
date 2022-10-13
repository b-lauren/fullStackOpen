import { useEffect, useState } from 'react';
import axios from 'axios';

const Countries = ({ countries }) => {
  const tooManyCountries = countries.length > 10;
  const countrySingle = countries.length === 1;

  return (
    <>
      {tooManyCountries ? (
        <p>Too many matches, specify another filter</p>
      ) : countrySingle ? (
        <CountrySingle country={countries[0]} />
      ) : (
        countries.map((country) => (
          <CountryList key={country.name.common} country={country} />
        ))
      )}
    </>
  );
};

const CountryList = ({ country }) => {
  const [showCountry, setShowCountry] = useState(false);

  const handleShowButton = () => {
    setShowCountry(country);
    setShowCountry(!showCountry);
  };

  return (
    <div>
      {country.name.common + ' '}
      <button onClick={handleShowButton}>show</button>
      {showCountry ? <CountrySingle country={country} /> : ''}
    </div>
  );
};

const CountrySingle = ({ country }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital - {country.capital}</p>
      <p>Area - {country.area}</p>
      <p>Languages</p>
      <ul>
        {Object.values(country.languages).map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <img alt="country flag" src={country.flags.png} />
      <WeatherShow capital={country.capital} />
    </>
  );
};

const WeatherShow = ({ capital }) => {
  const [temperature, setTemperature] = useState(0);
  const [wind, setWind] = useState(0);
  const [icon, setIcon] = useState('');

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      )
      .then((response) => {
        setTemperature(response.data.main.temp);
        setWind(response.data.wind.speed);
        setIcon(response.data.weather[0].icon);
      });
  }, [capital]);

  const url = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <>
      <h2>Weather in {capital}</h2>
      <p>Temperature {temperature} Celcuis</p>
      <img alt="weather icon" src={url} />
      <p>Wind {wind}</p>
    </>
  );
};

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleSearchCountry = (event) => {
    const value = event.target.value;
    setSearchCountry(value);
    const list = countries.filter((country) =>
      country.name.common.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCountries(list);
  };

  return (
    <div className="App">
      <div>
        Find countries:
        <input value={searchCountry} onChange={handleSearchCountry} />
      </div>
      <Countries countries={filteredCountries} />
    </div>
  );
}

export default App;
