import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      console.log(response.data);
      setCountries(response.data);
    });
  }, []);

  return (
    <div className="App">
      <p>Hello</p>
    </div>
  );
}

export default App;
