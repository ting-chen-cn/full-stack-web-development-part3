import React from 'react'
import './Person.css'
const Persons = ({ searchedPerson, handelDelete }) => {
  return (
    <table>
      <tr id='tableHeader'>
        <th>name</th>
        <th>phone number</th>
        <th></th>
      </tr>
        {searchedPerson.map((note, i) => (
          <tr id='tableContext' key={note.name}>
            <th>{note.name}</th>
            <th>{note.number}</th>
            <th>
              <button onClick={() => handelDelete(note.id)}>
                delete
              </button>
            </th>
          </tr>
        ))}
    </table>
  )
}

export default Persons
