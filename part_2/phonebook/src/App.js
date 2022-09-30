import { useState } from 'react'
import { Person } from './components/Person'

const App = () => {
  //initialises the piece of state stored in persons 
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  //new piece of state to store the user-submitted input
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const personExists = persons.some(person => person.name === newName);

  const addPerson = (event) => {
    event.preventDefault()
    const newPersonObj = {
      name: newName,
      number: newNumber,
      id: Math.random(),
    }
    //only add if person doesn't exist, if they do issue an alert
    if(personExists) {
      alert(`${newName} is already in the phonebook`)
    } else {
      setPersons(persons.concat(newPersonObj))
      setNewName('')
      setNewNumber('')
    }
  }

  //sychronises the changes made with the components state
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input type="number" value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => 
          <Person person={person} key={person.name}/>
          )}
      </ul>
    </div>
  )
}

export default App
