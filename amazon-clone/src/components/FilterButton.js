import React from 'react'

const FilterButton = (props) => {
  return (
    <button
      type="button"
      className="btn toggle-btn"
      id={props.name}
      aria-pressed={props.isPressed}
      onClick={() => props.setFilter(props.name)}
    >
      <span>{props.name}</span>
    </button>
  )
}

export default FilterButton
