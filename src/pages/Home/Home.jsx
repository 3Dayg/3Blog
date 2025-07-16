import { useState, useMemo, useEffect, useCallback } from 'react'
import PostCard from '../../components/PostCard/PostCard'
import SearchBar from '../../components/SearchBar/SearchBar'
import TagFilter from '../../components/TagFilter/TagFilter'
import { usePostsContext } from '../../hooks/usePostsContext'
import styles from './Home.module.css'

const Home = () => {
  const { posts, loading, error } = usePostsContext()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const [displayedPostsCount, setDisplayedPostsCount] = useState(5)
  const [isLoading, setIsLoading] = useState(false)

  // Debug the posts from context
  console.log('🏠 Home component - posts from context:', posts.length)
  console.log('🏠 Home component - loading:', loading)
  console.log('🏠 Home component - error:', error)

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

  // Get posts to display (with pagination)
  const displayedPosts = useMemo(() => {
    return filteredPosts.slice(0, displayedPostsCount)
  }, [filteredPosts, displayedPostsCount])

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (isLoading) return

    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
    const clientHeight = document.documentElement.clientHeight || window.innerHeight
    const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight

    if (scrolledToBottom && displayedPosts.length < filteredPosts.length) {
      setIsLoading(true)
      // Simulate loading delay for better UX
      setTimeout(() => {
        setDisplayedPostsCount(prev => Math.min(prev + 5, filteredPosts.length))
        setIsLoading(false)
      }, 500)
    }
  }, [isLoading, displayedPosts.length, filteredPosts.length])

  // Attach scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Reset pagination when filters change
  useEffect(() => {
    setDisplayedPostsCount(5)
  }, [searchTerm, selectedTags])

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const handleTagChange = (tags) => {
    setSelectedTags(tags)
  }

  // Show loading state
  if (loading) {
    return (
      <div className={styles.home}>
        <div className={styles.container}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '50vh',
            fontSize: '1.2rem',
            color: '#6b7280'
          }}>
            Loading posts...
          </div>
        </div>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className={styles.home}>
        <div className={styles.container}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '50vh',
            fontSize: '1.2rem',
            color: '#dc2626'
          }}>
            Error loading posts: {error}
          </div>
        </div>
      </div>
    )
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
              Showing {displayedPosts.length} of {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''}
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
          {displayedPosts.length > 0 && (
            <>
              <div className={styles.postsGrid}>
                {displayedPosts.map(post => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
              
              {/* Loading indicator */}
              {isLoading && (
                <div className={styles.loadingMore}>
                  <div className={styles.spinner}></div>
                  <p>Loading more posts...</p>
                </div>
              )}
              
              {/* Load more indicator */}
              {!isLoading && displayedPosts.length < filteredPosts.length && (
                <div className={styles.loadMoreIndicator}>
                  <p>Scroll down to load more posts ({filteredPosts.length - displayedPosts.length} remaining)</p>
                </div>
              )}
            </>
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
