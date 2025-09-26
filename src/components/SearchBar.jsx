import { useState, useEffect } from 'react'
import '../SearchBar.css'

export default function SearchBar({ onSearch, defaultQuery = '' }) {
  const [q, setQ] = useState(defaultQuery)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    setQ(defaultQuery)
  }, [defaultQuery])

  const submit = (e) => {
    e.preventDefault()
    onSearch(q.trim())
  }

  const clearSearch = () => {
    setQ('')
    onSearch('')
  }

  return (
    <div className="search-bar-container">
      <form 
        className={`search-form ${isFocused ? 'focused' : ''}`} 
        onSubmit={submit} 
        role="search" 
        aria-label="Search movies"
      >
        <div className="search-input-container">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Titles, people, genres..."
            value={q}
            onChange={e => setQ(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            aria-label="Movie title"
            className="search-input"
          />
          {q && (
            <button 
              type="button" 
              className="clear-button"
              onClick={clearSearch}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
        <button 
          type="submit" 
          className="search-submit-button"
          aria-label="Search"
        >
          Search
        </button>
      </form>
      
      {!q && (
        <div className="search-suggestions">
          <p>Popular Searches:</p>
          <div className="suggestion-tags">
            {['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance'].map(genre => (
              <button
                key={genre}
                type="button"
                className="suggestion-tag"
                onClick={() => {
                  setQ(genre)
                  onSearch(genre)
                }}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}