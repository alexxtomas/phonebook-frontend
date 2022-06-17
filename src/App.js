import { useState, useEffect } from 'react'
import PersonForm from './components/PersonFrom'
import Persons from './components/Persons'
import Filter from './components/Filter'


import { getPhones } from './services/phonebook/getPhones'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newFilter, setNewFilter] = useState('')
  const [error, setError] = useState('')
  useEffect(() => {
    getPhones()
      .then(persons => setPersons(persons))
  }, [])
  

  return (
    <div>
      <h2>Phonebook</h2>
      {error ? <h3>{error.error}</h3> : ''}
      <Filter setNewFilter={setNewFilter} />
      <h2>Add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} setError={setError}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={newFilter} setPersons={setPersons}/>
    </div>
  )
}

export default App