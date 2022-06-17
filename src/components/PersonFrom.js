import axios from "axios"
import { useState } from "react"
import { createPhones } from "../services/phonebook/createPhones"
import { getPhones } from "../services/phonebook/getPhones"

const PersonForm = ({persons, setPersons, setError}) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
  
    const handlerChangeName = event => {
      setNewName(event.target.value)
    }
    const handlerChangeNumber = event => {
        setNewNumber(event.target.value)
    }
  
    const handlerSubmit = event => {
      event.preventDefault()
      let alredyAdded = false 
      persons.forEach((person) => {
        if (person.name === newName) {
            alredyAdded = true
            if(window.confirm(`${newName} is alredy added to phonebook, replace the old number with a new one?`)) {
             const toReplace =  persons.find(person => person.name === newName)
             console.log(toReplace.id)
             axios.put(`http://localhost:3001/api/persons/${toReplace.id}`, {name: newName, number: newNumber})
              .then(result => {
                getPhones().then(data => setPersons(data))
              })
              .catch(err => setError(err.response.data))

            }
            return alredyAdded
      } 
  
      })
      if(!alredyAdded) {
        createPhones({name: newName}, {number: newNumber})
                    .catch(err => setError(err.response.data))
                    
        getPhones().then((data) => setPersons(data))
        // document.location.reload()
          
  
      }

      setNewName('')
      setNewNumber('')
  }
  
  return (
    <form onSubmit={handlerSubmit}>
      <div>name: <input onChange={handlerChangeName} value={newName} required/></div>
      <div>number: <input onChange={handlerChangeNumber} value={newNumber} required/></div>
      <div><button type="submit">add</button></div>
    </form>
  )
  }

export default PersonForm