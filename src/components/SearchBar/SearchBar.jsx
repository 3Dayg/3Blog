import { useState } from 'react'
import styles from './SearchBar.module.css'

const SearchBar = ({ onSearch, placeholder = "Search posts..." }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(searchTerm.trim())
  }

  const handleChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    
    // Real-time search (optional - remove if you prefer submit-only)
    if (value.trim() === '') {
      onSearch('')
    }
  }

  const handleClear = () => {
    setSearchTerm('')
    onSearch('')
  }

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder={placeholder}
          className={styles.searchInput}
          aria-label="Search blog posts"
        />
        
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className={styles.clearButton}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
        
        <button
          type="submit"
          className={styles.searchButton}
          aria-label="Submit search"
        >
          🔍
        </button>
      </div>
    </form>
  )
}

export default SearchBar
