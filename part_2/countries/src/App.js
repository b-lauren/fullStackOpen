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

// countries component which receives the full list. Maps over the list and returns the countryList component
// CountryList that renders the names and the buttons

// Country single that receives 1 single country and displays the info

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
      <h2>{country.name.common}</h2>
      <p>Capital - {country.capital}</p>
      <p>Area - {country.area}</p>
      <p>Languages</p>
      <ul>
        {Object.values(country.languages).map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <img alt="country flag" src={country.flags.png} />
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
