import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Person'
import Filter from './components/Filter'
import personService from './services/note'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearchPerson, setSearchPerson] = useState('')
  const [searchedPerson, setSearched] = useState(persons)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  useEffect(() => {
    personService.getAll().then((initialNotes) => {
      setPersons(initialNotes)
      setSearched(initialNotes)
    })
  }, [])
  const addPerson = (event) => {
    event.preventDefault()
    const noteObject = {
      name: newName,
      number: newNumber,
    }
    const pos = persons.find((n) => n.name === `${newName}`)
    if (pos === undefined) {
      personService
        .create(noteObject)
        .then((changedNote) => {
          const add = persons.concat(changedNote)
          setPersons(add)
          setNewName('')
          setNewNumber('')
          const result = add.filter((w) =>
            w.name
              .toLowerCase()
              .includes(newSearchPerson.toLowerCase())
          )
          setSearched(result)
          setMessage(`Added ${newName}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch((error) => {
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    } else {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(pos.id, noteObject)
          .then((returnedNote) => {
            const changed = persons.map((note) =>
              note.id !== pos.id ? note : returnedNote
            )
            setPersons(changed)
            setNewName('')
            setNewNumber('')
            const result = changed.filter((w) =>
              w.name
                .toLowerCase()
                .includes(newSearchPerson.toLowerCase())
            )
            setSearched(result)
            setMessage(`Added  ${newName}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch((error) => {
            setErrorMessage(error.response.data.error)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
    }
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }
  const handelNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchPerson = (event) => {
    setSearchPerson(event.target.value)
    let result = persons.filter((w) =>
      w.name.toLowerCase().includes(event.target.value.toLowerCase())
    )
    setSearched(result)
  }

  const handleDeleteOf = (id) => {
    const deletePerson = persons.find((n) => n.id === id)
    if (window.confirm(`Delete ${deletePerson.name} ?`)) {
      personService
        .deleteOf(id)
        .then(() => {
          setPersons(persons.filter((n) => n.id !== id))
          setSearched(persons.filter((n) => n.id !== id))
        })
        .catch((error) => {
          setErrorMessage(
            `Information of ${deletePerson.name} has already been removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <ErrorNotification errorMessage={errorMessage} />
      <Filter
        newSearchPerson={newSearchPerson}
        handleSearchPerson={handleSearchPerson}
      />
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handelNumberChange={handelNumberChange}
        handlePersonChange={handlePersonChange}
      />
      <h3>Numbers</h3>
      <Persons
        searchedPerson={searchedPerson}
        handelDelete={handleDeleteOf}
      />
    </div>
  )
}

export default App
