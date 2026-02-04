import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState("")

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
    console.log(newNameToList)
    if (persons.some(person => person.name === newNameToList.name)) {
      alert(`${newNameToList.name} is already in the phonebook!`)
    }
    else {
      setPersons(persons.concat(newNameToList))
      setNewName("")
    }
  }
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filterString.toLowerCase()))
  console.log(filteredPersons)
  

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with: <input onChange={handleFilter}/>
      <h1>add a new</h1>
      <form onSubmit={handleSubmit}>
        
        <div>
          
          <div>name: <input value={newName} onChange={handleNameChange}/></div>
          <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map(person => <p key={person.name}> {person.name} {person.number}</p>)}
    </div>
  )

}

export default App