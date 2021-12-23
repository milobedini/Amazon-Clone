import React from 'react'
import { MdSearch } from 'react-icons/md'
import '../styles/Search.scss'

const Search = ({ handleSearch }) => {
  return (
    <div className="search">
      <MdSearch className="search-icons" size="1.3em" />
      <input
        type="text"
        onChange={(event) => handleSearch(event.target.value)}
      />
    </div>
  )
}

export default Search
