import React from 'react'
const Filter = ({ newSearchPerson, handleSearchPerson }) => {
  return (
    <div>
      <>
        filter shown with{' '}
        <input
          value={newSearchPerson}
          onChange={handleSearchPerson}
        />
      </>
    </div>
  )
}

export default Filter
