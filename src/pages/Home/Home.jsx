import { useState, useMemo } from 'react'
import PostCard from '../../components/PostCard/PostCard'
import SearchBar from '../../components/SearchBar/SearchBar'
import TagFilter from '../../components/TagFilter/TagFilter'
import styles from './Home.module.css'

const Home = ({ posts = [] }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState([])

  // Extract all unique tags from posts
  const allTags = useMemo(() => {
    const tags = new Set()
    posts.forEach(post => {
      if (post.tags) {
        post.tags.forEach(tag => tags.add(tag))
      }
    })
    return Array.from(tags).sort()
  }, [posts])

  // Filter posts based on search term and selected tags
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      // Search filter
      const matchesSearch = searchTerm === '' || 
        post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      // Tag filter
      const matchesTags = selectedTags.length === 0 ||
        selectedTags.every(selectedTag => 
          post.tags?.includes(selectedTag)
        )

      return matchesSearch && matchesTags
    })
  }, [posts, searchTerm, selectedTags])

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const handleTagChange = (tags) => {
    setSelectedTags(tags)
  }

  return (
    <div className={styles.home}>
      <div className={styles.container}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>Welcome to 3Blog</h1>
          <p className={styles.heroSubtitle}>
            Exploring ideas, sharing knowledge, and building connections through thoughtful writing.
          </p>
        </section>

        {/* Search and Filter Section */}
        <section className={styles.filters}>
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Search posts by title, content, or tags..."
          />
          
          {allTags.length > 0 && (
            <TagFilter
              tags={allTags}
              selectedTags={selectedTags}
              onTagChange={handleTagChange}
            />
          )}
        </section>

        {/* Results Summary */}
        <section className={styles.results}>
          <div className={styles.resultsHeader}>
            <h2 className={styles.resultsTitle}>
              {searchTerm || selectedTags.length > 0 ? 'Search Results' : 'Latest Posts'}
            </h2>
            <span className={styles.resultsCount}>
              {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''}
              {(searchTerm || selectedTags.length > 0) && ` found`}
            </span>
          </div>

          {/* No Results Message */}
          {filteredPosts.length === 0 && (searchTerm || selectedTags.length > 0) && (
            <div className={styles.noResults}>
              <p>No posts found matching your criteria.</p>
              <button 
                onClick={() => {
                  setSearchTerm('')
                  setSelectedTags([])
                }}
                className={styles.clearFilters}
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Posts Grid */}
          {filteredPosts.length > 0 && (
            <div className={styles.postsGrid}>
              {filteredPosts.map(post => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}

          {/* Empty State for no posts at all */}
          {posts.length === 0 && (
            <div className={styles.emptyState}>
              <h3>No posts yet</h3>
              <p>Check back soon for new content!</p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default Home
