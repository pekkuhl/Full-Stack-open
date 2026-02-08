const express = require('express')
const morgan = require('morgan')
const app = express()

morgan.token('body', getBody = (req) => {
    return JSON.stringify(req.body)
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


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

app.post('/api/persons/', (req, res) => {
    const body = req.body
    const randomId = Math.floor(Math.random() * 64000)

    if (persons.find(person => person.name === body.name))
        return res.status(400).json({
            error: 'name already exists'
        })

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'name or phone number missing'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: String(randomId)
    }

    persons.concat(person)
    res.json(person)
})

const PORT = 3001
app.listen(PORT)
console.log(`App is running on port ${PORT}`)