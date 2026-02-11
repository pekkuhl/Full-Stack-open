import { useEffect, useState } from 'react'
import Filter from "./components/Filter.jsx"
import Persons from "./components/Persons.jsx"
import PersonForm from "./components/PersonForm.jsx"
import contactService from './services/contacs.js'
import Notification from './components/Notification.jsx'
import ErrorNotification from './components/ErrorNotification.jsx'



const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState("")
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  const getPersons = () => {
    contactService
    .getAll()
    .then(res => setPersons(res.data))
    .catch(error => {
      setErrorMessage("Error happened while trying to fetch Numbers")
      setTimeout(() => {
        setErrorMessage(null)
      },2000)
      console.log('Something went wrong', error)
    })
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
      if (confirm(`${newNameToList.name} is already in the phonebook, replace old number with a new one?`)) {
        const newPhoneNumber = {
          name: newName,
          number: newNumber
        }
        const target = persons.find(person => person.name === newName)
        const targetId = target.id

        contactService
        .update(targetId, newPhoneNumber)
        .then(res => {
          setPersons(persons.map(person => person.id !== targetId ? person : res.data))
          setSuccessMessage(`Number of the person ${newPhoneNumber.name} was updated succesfully`)
          setTimeout(() => {
          setSuccessMessage(null)
        }, 2000)})
        .catch(error => {
          console.log('Something went wrong', error)
          setErrorMessage("Error happened while trying to update the number")
          setTimeout(() => {
            setErrorMessage(null)
          }, 2000)
        })
      }
    }
    else {
      contactService
      .create(newNameToList)
      .then(res => {
        setPersons(persons.concat(res.data))
        setSuccessMessage(`${newNameToList.name} was added succesfully`)
        setTimeout(() => {
          setSuccessMessage(null)
            },2000)})
      .catch(error => {
        console.log("Failed to add new person", error.response.data)
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 2000)
        
      })
      setNewName("")
      setNewNumber("")
      
    }
  }
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filterString.toLowerCase()))

  const removePerson = (id) => {
      console.log(`removes this one ${id}`)
      const target = persons.find(person => 
        person.id === id)
        console.log(target)
      
      if (confirm(`are you sure you want to remove ${target.name}`)) {
      contactService
      .removeContact(id)
      .then(res => {
        setPersons(persons.filter(person => person.id !== id))
        setSuccessMessage(`${target.name} was removed succesfully`)
        setTimeout(() => {
        setSuccessMessage(null)
      }, 2000)})
      .catch(error =>{
        console.log(`Something went wrong ${error}`)
        setErrorMessage("Error happened while trying to delete a contact")
        setTimeout(() => {
          setErrorMessage(null)
        },2000)
      } )
      }
  }


  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage}/>
      <ErrorNotification message={errorMessage} />
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