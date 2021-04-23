import React from 'react'
import './PersonForm.css'
const PersonForm = ({
  addPerson,
  newName,
  newNumber,
  handelNumberChange,
  handlePersonChange,
}) => {
  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          <input placeholder='name' value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          <input placeholder='phone number' value={newNumber} onChange={handelNumberChange} />
        </div>
        <>
          <button type='submit'>submit</button>
        </>
      </form>
    </div>
  )
}
export default PersonForm
