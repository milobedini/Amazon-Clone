import React, { useState } from 'react'
import { MdSearch, MdClose } from 'react-icons/md'
import '../styles/Search.scss'

const Search = ({ handleSearch, placeholder, data, setItems, items }) => {
  const [filteredData, setFilteredData] = useState([])
  const [wordEntered, setWordEntered] = useState('')

  const handleFilter = (event) => {
    const searchTerm = event.target.value.toLowerCase()
    setWordEntered(searchTerm)
    const newFilter = data.filter((x) => {
      return x.title.toLowerCase().includes(wordEntered)
    })
    if (searchTerm === '') {
      setFilteredData([])
      setItems(data)
    } else setFilteredData(newFilter)
  }

  const changeHome = () => {
    setItems(filteredData)
  }

  const clearInput = () => {
    setWordEntered('')
    setFilteredData([])
    setItems(data)
  }

  return (
    <div className="search">
      <div className="search-left">
        <MdSearch className="search-icons" size="1.3em" />
        <input
          className="search-inputs"
          type="text"
          onChange={handleFilter}
          placeholder={placeholder}
          value={wordEntered}
        />
        <MdClose
          id="clear-button"
          size="1.3em"
          color="red"
          onClick={clearInput}
        />
      </div>

      {filteredData.length !== 0 && (
        <div className="search-result">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <button className="search-item" key={key} onClick={changeHome}>
                <p key={key}>{value.title}</p>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Search
