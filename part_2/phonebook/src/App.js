import { useState, useEffect } from 'react';
import { Person } from './components/Person';
import { PhonebookForm } from './components/PhonebookForm';
import { Search } from './components/Search';
import peopleService from './services/people';

// NEXT EXERCISE: Save the numbers that are added to the phone book to a backend server - follow course

const App = () => {
  //initialises the piece of state stored in persons
  const [persons, setPersons] = useState([]);

  //new piece of state to store the user-submitted input
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const personExists = persons.some((person) => person.name === newName);

  //fetching data from the server using the axios-library
  useEffect(() => {
    peopleService.getAllPeople().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const newPersonObj = {
      name: newName,
      number: newNumber,
      id: Math.random(),
    };
    peopleService
      .addPerson(newPersonObj)
      // .post('http://localhost:3001/persons', newPersonObj)
      .then((response) => {
        console.log(response);
      });

    //only add if person doesn't exist, if they do issue an alert
    if (personExists) {
      alert(`${newName} is already in the phonebook`);
    } else {
      setPersons(persons.concat(newPersonObj));
      setNewName('');
      setNewNumber('');
    }
  };

  //sychronises the changes made with the components state
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchInput(value);
    const filteredResult = persons.filter((person) =>
      person.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setPersons(filteredResult);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Search value={searchInput} onChange={handleSearch} />
      <h3>Add New</h3>
      <PhonebookForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <Person person={person} key={person.name} />
        ))}
      </ul>
    </div>
  );
};

export default App;
