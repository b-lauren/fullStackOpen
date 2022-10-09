import { useEffect, useState } from 'react';
import axios from 'axios';

const Countries = ({ countries }) => {
  const tooManyCountries = countries.length > 10;
  return (
    <>
      {tooManyCountries ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        countries.map((country) => (
          <Country key={country.name.common} country={country} />
        ))
      )}
    </>
  );
};

const Country = ({ country }) => {
  return <p>{country.name.common}</p>;
};

function App() {
  const [countries, setCountries] = useState([]);
  const [searchCountry, setsearchCountry] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      setCountries(response.data);
    });
  }, []);

  const filteredCountry = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchCountry.toLowerCase())
  );

  const handleSearchCountry = (event) => {
    setsearchCountry(event.target.value);
    setCountries(filteredCountry);
  };

  return (
    <div className="App">
      <div>
        Find countries:
        <input value={searchCountry} onChange={handleSearchCountry} />
      </div>
      <Countries countries={countries} />
    </div>
  );
}

export default App;

// {countries.map((country) => (
//   <Countries key={country.name.common} country={country} />
// ))}

// create another CountryInfo Component, where all of the data for that country will be displayed
// move the map in app file to countries component and implement logic

// 3)implement stricter search -
// if there are 10 or more countries, prompt the user to be more specific
// 4)If there are 10 or fewer countries, show the countries below
// 5)When there is only one, show all of the data for it
