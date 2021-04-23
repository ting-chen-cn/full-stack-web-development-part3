import React from 'react'
import SearchIcon from '@material-ui/icons/Search'
import './Filter.css'
const Filter = ({ newSearchPerson, handleSearchPerson }) => {
  return (
    
      <div className="search">
        <SearchIcon className="searchIcon"/>
        <input
          placeholder="filter shown with"
          className="search_input"
          value={newSearchPerson}
          onChange={handleSearchPerson}
        />
      </div>
    
  )
}

export default Filter
