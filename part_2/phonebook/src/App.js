import { useState } from 'react';
import { Person } from './components/Person';

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
  const [searchList, setSearchList] = useState('');

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
    setSearchList(event.target.value);
  };

  // TODO: map over the persons array and filter it with the set search list??
  // const filter = persons.includes(searchList);
  // const filteredResult = persons.filter((person) => {
  //   return person.name.includes('a');
  // });

  console.log(searchList);

  //add if statement to decide if we should filter or just show persons list

  return (
    <div>
      <h2>Phonebook</h2>
      Search phonebook: <input value={searchList} onChange={handleSearch} />
      <h3>Add New</h3>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number:{' '}
          <input
            type="number"
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {searchList > 1
          ? persons
              .filter((person) => person.name.includes(searchList))
              .map((person) => (
                <p key={person.id}>
                  {person.name} {person.number}
                </p>
              ))
          : persons.map((person) => (
              <Person person={person} key={person.name} />
            ))}
      </ul>
    </div>
  );
};

export default App;

// {
//   searchList > 1
//     ? persons
//         .filter((person) => person.name.includes(searchList))
//         .map((person) => (
//           <p key={person.id}>
//             {person.name} {person.number}
//           </p>
//         ))
//     : persons.map((person) => <Person person={person} key={person.name} />);
// }
