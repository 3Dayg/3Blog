import { useState, useEffect } from 'react'
import { sortPostsByDate } from '../utils/postHelpers'
import { loadMarkdownPosts } from '../utils/markdownLoader'

/**
 * Hook for managing blog posts
 * This is a placeholder that you can extend to load posts from markdown files
 */
export const usePosts = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadPosts = async () => {
      try {
        console.log('🚀 usePosts: Starting to load posts...')
        setLoading(true)
        
        // Load posts from markdown files
        const markdownPosts = await loadMarkdownPosts()
        console.log('📚 usePosts: Received posts:', markdownPosts.length)
        
        // Sort posts by date (newest first)
        const sortedPosts = sortPostsByDate(markdownPosts)
        console.log('📅 usePosts: Sorted posts:', sortedPosts.length)
        
        setPosts(sortedPosts)
        setError(null)
        console.log('✅ usePosts: Posts set successfully')
      } catch (err) {
        console.error('💥 usePosts error:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  return { posts, loading, error }
}

/**
 * Hook for loading a single post by slug
 */
export const usePost = (slug) => {
  const { posts, loading, error } = usePosts()
  const [post, setPost] = useState(null)

  useEffect(() => {
    if (!loading && posts.length > 0) {
      const foundPost = posts.find(p => p.slug === slug)
      setPost(foundPost || null)
    }
  }, [posts, loading, slug])

  return { post, loading, error }
}
