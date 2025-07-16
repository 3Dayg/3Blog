import { useState } from 'react'
import styles from './TagFilter.module.css'

const TagFilter = ({ tags, selectedTags, onTagChange }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      onTagChange(selectedTags.filter(t => t !== tag))
    } else {
      onTagChange([...selectedTags, tag])
    }
  }

  const handleClearAll = () => {
    onTagChange([])
  }

  const visibleTags = isExpanded ? tags : tags.slice(0, 8)

  return (
    <div className={styles.tagFilter}>
      <div className={styles.header}>
        <h3 className={styles.title}>Filter by Tags</h3>
        {selectedTags.length > 0 && (
          <button 
            onClick={handleClearAll}
            className={styles.clearButton}
            aria-label="Clear all selected tags"
          >
            Clear All
          </button>
        )}
      </div>

      <div className={styles.tagContainer}>
        {visibleTags.map(tag => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`${styles.tag} ${
              selectedTags.includes(tag) ? styles.tagSelected : ''
            }`}
            aria-pressed={selectedTags.includes(tag)}
          >
            {tag}
          </button>
        ))}
        
        {tags.length > 8 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={styles.expandButton}
            aria-expanded={isExpanded}
          >
            {isExpanded ? 'Show Less' : `+${tags.length - 8} More`}
          </button>
        )}
      </div>

      {selectedTags.length > 0 && (
        <div className={styles.selectedInfo}>
          <span className={styles.selectedCount}>
            {selectedTags.length} tag{selectedTags.length !== 1 ? 's' : ''} selected
          </span>
        </div>
      )}
    </div>
  )
}

export default TagFilter
