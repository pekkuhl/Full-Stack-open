import { useEffect, useState } from 'react'
import Filter from "./components/Filter.jsx"
import Persons from "./components/Persons.jsx"
import PersonForm from "./components/PersonForm.jsx"
import axios from 'axios'
import contactService from './services/contacs.js'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState("")


  const getPersons = () => {
    contactService
    .getAll()
    .then(res => setPersons(res.data))
  }
  useEffect(getPersons,[])

  const handleNameChange = (e) => {
    console.log(e.target.value)
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    console.log(e.target.value)
    setNewNumber(e.target.value)
  }

  const handleFilter = (e) => {
    console.log(e.target.value)
    setFilterString(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newNameToList = {
      name: newName,
      number: newNumber
    }
    
    if (persons.some(person => person.name === newNameToList.name)) {
      alert(`${newNameToList.name} is already in the phonebook!`)
    }
    else {
      contactService
      .create(newNameToList)
      .then(res => setPersons(persons.concat(res.data))
      )
      setNewName("")
      setNewNumber("")
      
    }
  }
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filterString.toLowerCase()))
  console.log(filteredPersons)

  const removePerson = (id) => {
      console.log(`removes this one ${id}`)
      const target = persons.find(person => 
        person.id === id)
        console.log(target)
      
      if (confirm(`are you sure you want to remove ${target.name}`)) {
      contactService
      .removeContact(id)
      .then(res => setPersons(persons.filter(person => person.id !== res.data.id)))
      }


  }
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFilter} />

      <h1>add a new</h1>
      <PersonForm // props = {
      onSubmit={handleSubmit}
      newName={newName}
      onHandleNameChange={handleNameChange}
      newNumber={newNumber}
      onHandleNumberChange={handleNumberChange}
      />
     
      <h2>Numbers</h2>
      
      <ul>
        {filteredPersons.map(person => 
          <Persons // props = {
          key={person.id}
          person={person}
          onHandleClick={() => removePerson(person.id)}/>
        )}
      </ul>
    </div>
  )

}

export default App