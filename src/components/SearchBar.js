import { useState } from 'react'

export const SearchBar = ({ handleSearch }) => {
  const [inputText, setInputText] = useState('')

  return (
    <div className="search">
      <input
        type="text"
        value={inputText}
        onChange={evt => setInputText(evt.target.value)}
        placeholder="Search..."
      />
      <button onClick={() => handleSearch(inputText)}>Search</button>
    </div>
  )
}
