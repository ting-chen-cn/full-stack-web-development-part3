import React from 'react'
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
          name:{' '}
          <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          number:{' '}
          <input value={newNumber} onChange={handelNumberChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </div>
  )
}
export default PersonForm
