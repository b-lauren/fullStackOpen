import { useState } from 'react';
import { Person } from './components/Person';
import { PhonebookForm } from './components/PhonebookForm';
import { Search } from './components/Search';

const App = () => {
  //initialises the piece of state stored in persons
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  //new piece of state to store the user-submitted input
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const personExists = persons.some((person) => person.name === newName);

  const addPerson = (event) => {
    event.preventDefault();
    const newPersonObj = {
      name: newName,
      number: newNumber,
      id: Math.random(),
    };
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
    setSearchInput(event.target.value);
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
