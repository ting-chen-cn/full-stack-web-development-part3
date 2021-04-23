// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config()
// }
// const express = require('express')
// const morgan = require('morgan')
// const cors = require('cors')
// const bodyParser = require('body-parser')
// const app = express()
// app.use(cors())

// const Person = require('./models/person')

// app.use(express.static('build'))
// app.use(bodyParser.json())
// morgan.token('data', (request, response) => {
//   if (request.method === 'POST') {
//     return JSON.stringify(request.body)
//   }
// })
// app.use(morgan(':method :url :status - :response-time ms :data'))

// app.get('/', (request, response) => {
//   response.send(
//     '<h1>Hello World!</h1><p>This is the home page of phonebook application.</p>'
//   )
// })

// app.get('/info', (request, response) => {
//   Person.find({}).then((person) => {
//     response.send(
//       `<p>Phonebook has info for
//     ${person.length} people</p>
//     <p> ${Date()}</p>`
//     )
//   })
// })

// app.get('/api/persons', (request, response) => {
//   Person.find({}).then((person) => {
//     response.json(person.map((person) => person.toJSON()))
//   })
// })

// app.get('/api/persons/:id', (request, response, next) => {
//   Person.findById(request.params.id)
//     .then((person) => {
//       if (person) {
//         response.json(person.toJSON())
//       } else {
//         response.status(404).end()
//       }
//     })
//     .catch((error) => next(error))
// })

// app.put('/api/persons/:id', (request, response, next) => {
//   const body = request.body
//   const person = {
//     name: body.name,
//     number: body.number,
//   }

//   Person.findByIdAndUpdate(request.params.id, person, { new: true })
//     .then((updatedPerson) => {
//       response.json(updatedPerson.toJSON())
//     })
//     .catch((error) => next(error))
// })

// app.delete('/api/persons/:id', (request, response, next) => {
//   Person.findByIdAndRemove(request.params.id)
//     .then((result) => {
//       response.status(204).end()
//     })
//     .catch((error) => next(error))
// })

// app.post('/api/persons', (request, response, next) => {
//   const body = request.body
//   const person = new Person({
//     name: body.name,
//     number: body.number,
//   })
//   person
//     .save()
//     .then((savedPerson) => {
//       response.json(savedPerson.toJSON())
//     })
//     .catch((error) => next(error))
// })

// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: 'unknown endpoint' })
// }
// app.use(unknownEndpoint)

// const errorHandler = (error, request, response, next) => {
//   console.error(error.message)
//   if (error.name === 'CastError' && error.kind === 'ObjectId') {
//     return response.status(400).send({ error: 'malformatted id' })
//   } else if (error.name === 'ValidationError') {
//     return response.status(400).json({ error: error.message })
//   }
//   next(error)
// }
// app.use(errorHandler)

// const PORT = process.env.PORT || 3001
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })

// ########### answer

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

morgan.token('body', function (req) {
  return JSON.stringify(req.body)
})

app.use(express.static('build'))
app.use(bodyParser.json())
app.use(cors())
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :body'
  )
)

app.get('/info', (request, response) => {
  Person.find({}).then((persons) => {
    const content = `
      Phonebook has info for ${persons.length} people
      <br/><br/>
      ${new Date()}
    `
    response.send(content)
  })
})

app.get('/api/persons', (request, response) => {
  Person.find().then((persons) => {
    response.json(persons.map((p) => p.toJSON()))
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing',
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson.toJSON())
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true }
  )
    .then((updatedPerson) => {
      response.json(updatedPerson.toJSON())
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
