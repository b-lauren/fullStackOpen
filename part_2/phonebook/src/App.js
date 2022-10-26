import { useState, useEffect } from 'react';
import { Person } from './components/Person';
import { PhonebookForm } from './components/PhonebookForm';
import { Search } from './components/Search';
import { Notification } from './components/Notification';
import peopleService from './services/people';

const App = () => {
  //initialises the piece of state stored in persons
  const [persons, setPersons] = useState([]);

  //new piece of state to store the user-submitted input
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);

  const personExists = persons.some((person) => person.name === newName);

  //fetching data from the server using the axios-library
  useEffect(() => {
    peopleService.getAllPeople().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addPerson = (event, id) => {
    event.preventDefault();
    const newPersonObj = {
      name: newName,
      number: newNumber,
      id: Math.random(),
    };

    if (personExists) {
      const response = window.confirm(
        `${newName} is already in the phonebook. Replace the old number with a new one?`
      );
      if (response) {
        //find person to update
        const numberToChange = persons.find((n) => n.name === newName);
        const changedNumber = { ...numberToChange, number: newNumber };
        //call peopleService and update - pass in info
        peopleService
          .update(numberToChange.id, changedNumber)
          .then((updatedPerson) => {
            setPersons(
              persons.map((n) => (n.name === newName ? updatedPerson : n))
            );
          })
          .catch((error) => {
            console.log(error);
          });
        //catch the error?
        //reset setNewName and setNewNumber
        setNewName('');
        setNewNumber('');
        console.log('id:', numberToChange.id);
      }
    } else {
      // .post('http://localhost:3001/persons', newPersonObj)
      peopleService.addPerson(newPersonObj).then((response) => {
        setSuccessMessage(`${newName} was added to the phonebook`);
      });
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);

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

  const deleteSomeone = (id) => {
    const answer = window.confirm('Do you really want to delete?');
    if (answer) {
      peopleService.deletePerson(id);
      setPersons(persons.filter((n) => n.id !== id));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} />
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
          <Person
            person={person}
            key={person.id}
            handleClick={() => deleteSomeone(person.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
