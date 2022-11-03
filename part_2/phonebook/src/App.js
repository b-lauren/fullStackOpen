import { useState, useEffect } from 'react';
import { Person } from './components/Person';
import { PhonebookForm } from './components/PhonebookForm';
import { Search } from './components/Search';
import { Notification } from './components/Notification';
import peopleService from './services/people';

const App = () => {
  //initialises the piece of state stored in persons
  const [persons, setPersons] = useState([]);
  const [personsDisplayed, setPersonsDisplayed] = useState([]);

  //new piece of state to store the user-submitted input
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [notification, setNotification] = useState(null);
  const [alertType, setAlertType] = useState('success');

  const personExists = persons.some((person) => person.name === newName);
  const filteredResult = persons.filter((person) =>
    person.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  //fetching data from the server using the axios-library
  useEffect(() => {
    peopleService.getAllPeople().then((response) => {
      setPersons(response.data);
      setPersonsDisplayed(response.data);
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
        //call peopleService and update the number
        peopleService
          .update(numberToChange.id, changedNumber)
          .then((updatedPerson) => {
            const listAdd = persons.map((n) =>
              n.name === newName ? updatedPerson : n
            );
            setPersons(listAdd);
            setPersonsDisplayed(listAdd);
          })

          .catch((error) => {
            setNotification(`${newName} was already removed from server`);
            setAlertType('error');
          });

        setTimeout(() => {
          setNotification(null);
        }, 5000);

        setNewName('');
        setNewNumber('');
        console.log('id:', numberToChange.id);
      }
    } else {
      // .post('http://localhost:3001/persons', newPersonObj)
      peopleService.addPerson(newPersonObj).then((response) => {
        setNotification(`${newName} was added to the phonebook`);
        setAlertType('success');
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
      const addSomeone = persons.concat(newPersonObj);
      setPersons(addSomeone);
      setPersonsDisplayed(addSomeone);
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

    if (value.length > 0) {
      setPersonsDisplayed(filteredResult);
    } else {
      const everybody = persons.map((person) => person);
      setPersonsDisplayed(everybody);
    }
  };

  const deleteSomeone = (id) => {
    const answer = window.confirm('Do you really want to delete?');
    if (answer) {
      peopleService.deletePerson(id);
      const listWithout = persons.filter((n) => n.id !== id);
      setPersons(listWithout);
      setPersonsDisplayed(listWithout);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} alertType={alertType} />
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
      {personsDisplayed.map((person) => (
        <Person
          person={person}
          key={person.id}
          handleClick={() => deleteSomeone(person.id)}
        />
      ))}
    </div>
  );
};

export default App;
