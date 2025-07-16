// Utility functions for handling blog posts

/**
 * Parse frontmatter from markdown content
 * @param {string} content - Raw markdown content with frontmatter
 * @returns {object} - { metadata, content }
 */
export const parseFrontmatter = (content) => {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)
  
  if (!match) {
    return {
      metadata: {},
      content: content
    }
  }
  
  const frontmatter = match[1]
  const markdownContent = match[2]
  
  // Parse YAML-like frontmatter
  const metadata = {}
  const lines = frontmatter.split('\n')
  
  lines.forEach(line => {
    const colonIndex = line.indexOf(':')
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim()
      let value = line.substring(colonIndex + 1).trim()
      
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
      }
      
      // Handle arrays (tags)
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1)
          .split(',')
          .map(item => item.trim().replace(/["']/g, ''))
          .filter(item => item.length > 0)
      }
      
      metadata[key] = value
    }
  })
  
  return {
    metadata,
    content: markdownContent
  }
}

/**
 * Generate a slug from a title
 * @param {string} title - Post title
 * @returns {string} - URL-friendly slug
 */
export const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim('-') // Remove leading/trailing hyphens
}

/**
 * Estimate reading time for content
 * @param {string} content - Markdown content
 * @returns {number} - Estimated reading time in minutes
 */
export const estimateReadingTime = (content) => {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  const readingTime = Math.ceil(wordCount / wordsPerMinute)
  return Math.max(1, readingTime) // Minimum 1 minute
}

/**
 * Generate excerpt from content
 * @param {string} content - Markdown content
 * @param {number} maxLength - Maximum length of excerpt
 * @returns {string} - Generated excerpt
 */
export const generateExcerpt = (content, maxLength = 150) => {
  // Remove markdown formatting for excerpt
  const plainText = content
    .replace(/#{1,6}\s+/g, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/`(.*?)`/g, '$1') // Remove inline code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links, keep text
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '') // Remove images
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim()
  
  if (plainText.length <= maxLength) {
    return plainText
  }
  
  // Find the last complete word within the limit
  const truncated = plainText.substring(0, maxLength)
  const lastSpaceIndex = truncated.lastIndexOf(' ')
  
  if (lastSpaceIndex > 0) {
    return truncated.substring(0, lastSpaceIndex) + '...'
  }
  
  return truncated + '...'
}

/**
 * Sort posts by date (newest first)
 * @param {Array} posts - Array of post objects
 * @returns {Array} - Sorted posts
 */
export const sortPostsByDate = (posts) => {
  return [...posts].sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateB - dateA // Newest first
  })
}

/**
 * Filter posts by tag
 * @param {Array} posts - Array of post objects
 * @param {string} tag - Tag to filter by
 * @returns {Array} - Filtered posts
 */
export const filterPostsByTag = (posts, tag) => {
  return posts.filter(post => 
    post.tags && post.tags.includes(tag)
  )
}

/**
 * Get all unique tags from posts
 * @param {Array} posts - Array of post objects
 * @returns {Array} - Array of unique tags
 */
export const getAllTags = (posts) => {
  const tags = new Set()
  posts.forEach(post => {
    if (post.tags) {
      post.tags.forEach(tag => tags.add(tag))
    }
  })
  return Array.from(tags).sort()
}

/**
 * Search posts by title, content, or tags
 * @param {Array} posts - Array of post objects
 * @param {string} searchTerm - Search term
 * @returns {Array} - Filtered posts
 */
export const searchPosts = (posts, searchTerm) => {
  if (!searchTerm.trim()) {
    return posts
  }
  
  const term = searchTerm.toLowerCase()
  
  return posts.filter(post => {
    return (
      post.title?.toLowerCase().includes(term) ||
      post.excerpt?.toLowerCase().includes(term) ||
      post.content?.toLowerCase().includes(term) ||
      post.tags?.some(tag => tag.toLowerCase().includes(term))
    )
  })
}
