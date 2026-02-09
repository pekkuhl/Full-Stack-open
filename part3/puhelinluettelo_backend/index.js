require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')
const app = express()


morgan.token('body', getBody = (req) => {
    return JSON.stringify(req.body)
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.static('dist'))



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
    Person.find({}).then(persons => {
        res.json(persons)
    })

})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = Person.find(person => person.id === id)

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
    console.log("-> ", body)


    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'name or phone number missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        res.json(savedPerson)
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`App is running on port ${PORT}`)
