import React from 'react'
const Persons = ({ searchedPerson, handelDelete }) => {
  return (
    <div>
      <ul>
        {searchedPerson.map((note, i) => (
          <li key={note.name}>
            {note.name}&nbsp;{note.number}
            <button onClick={() => handelDelete(note.id)}>
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Persons
