const express = require('express')
const app = express()

let persons = [
    {
        id: "1", name: "Arto Hellas", number: "040-123456"
    },
    {
        id: "2", name: "Ada Lovelace", number: "39-44-5323523"
    },
    {
        id: "3", name: "Dan Abramov", number: "12-43-234345"
    },
    {
        id: "4", name: "Mary Poppendiec", number: "39-23-6423122"
    },
]

app.get('/info', (req, res) => {
    const infoCount = persons.length
    const dateNow = new Date()

    res.send(
        `<div>
            <p> Phonebook has info for ${infoCount} people </p>
            <p> ${dateNow} </p>
        </div>`
    )
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find(person => person.id === id)

    if (person) {
        res.json(person)
    }
    else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    persons = persons.filter(note => note.id !== id)

    res.status(204).end()
})

const PORT = 3001
app.listen(PORT)
console.log(`App is running on port ${PORT}`)