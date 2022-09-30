import { useState } from 'react'
import { Person } from './components/Person'

const App = () => {
  //initialises the piece of state stored in persons 
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('add someone')

  const addPerson = (event) => {
    event.preventDefault()
    const newNameObj = {
      name: newName,
      id: Math.random(),
    }
    setPersons(persons.concat(newNameObj))
    setNewName('')
  }

  //sychronises the changes made with the components state
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
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
