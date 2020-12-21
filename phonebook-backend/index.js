const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())

require('dotenv').config()
app.use(express.static('build'))
morgan.token('data', (request, response) => {
  if (request.method === 'POST') {
    return JSON.stringify(request.body)
  }
})
app.use(morgan(':method :url :status - :response-time ms :data'))
// let persons = [
//   {
//     name: 'Arto Hellas',
//     number: '040-123456',
//     id: 1,
//   },
//   {
//     name: 'Ada Lovelace',
//     number: '39-44-5323523',
//     id: 2,
//   },
//   {
//     name: 'Dan Abramov',
//     number: '12-43-234345',
//     id: 3,
//   },
//   {
//     name: 'Mary Poppendieck',
//     number: '39-23-6423122',
//     id: 4,
//   },
// ]
const Person = require('./models/person')
const { json } = require('express')

app.get('/', (request, response) => {
  response.send(
    '<h1>Hello World!</h1><p>This is the home page of phonebook application.</p>'
  )
})

app.get('/info', (request, response) => {
  Person.find({}).then((person) => {
    response.send(
      `<p>Phonebook has info for
    ${person.length} people</p>
    <p> ${Date()}</p>`
    )
  })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then((person) => {
    response.json(person)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  // const id = Number(request.params.id)
  // persons = persons.filter((person) => person.id !== id)

  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response) => {
  // const generateId = Math.floor(Math.random() * Math.floor(1000))
  const body = request.body
  if (!body.name) {
    return response.status(400).json({
      error: 'name missing',
    })
  }
  if (!body.number) {
    return response.status(400).json({
      error: 'number missing',
    })
  }
  // const isContained = persons.find(
  //   (person) => person.name === body.name
  // )
  // console.log(isContained)
  // if (isContained) {
  //   return response.status(400).json({
  //     error: 'name must be unique',
  //   })
  // }

  const person = new Person({
    name: body.name,
    number: body.number,
  })
  // persons = persons.concat(person)
  // response.json(person)
  person.save().then((savedPerson) => {
    response.json(savedPerson)
  })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
