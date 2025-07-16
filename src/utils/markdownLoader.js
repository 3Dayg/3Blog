import matter from 'gray-matter'
import { Buffer } from 'buffer'

// Make Buffer available globally for gray-matter
window.Buffer = Buffer

/**
 * Load and parse markdown files from the content directory
 */
/**
 * Load and parse markdown files from the public directory
 */
export const loadMarkdownPosts = async () => {
  try {
    console.log('🔍 Starting to load markdown posts...')
    
    // List of markdown files to load (since we can't dynamically discover them in public)
    const markdownFiles = [
      'getting-started-with-react.md',
      'css-modules-modern-web-development.md',
      'future-of-javascript.md'
    ]
    
    console.log('📁 Loading markdown files:', markdownFiles)
    
    const posts = []
    
    for (const filename of markdownFiles) {
      try {
        console.log('📄 Fetching file:', filename)
        const response = await fetch(`/content/posts/${filename}`)
        
        if (!response.ok) {
          console.warn(`⚠️ Failed to load ${filename}:`, response.status)
          continue
        }
        
        const rawMarkdown = await response.text()
        console.log('📝 Raw markdown loaded, length:', rawMarkdown?.length)
        
        const { data: frontmatter, content } = matter(rawMarkdown)
        console.log('⚡ Frontmatter:', frontmatter)
        
        // Extract filename for slug generation
        const slug = filename.replace('.md', '')
        
        // Create post object
        const post = {
          title: frontmatter.title || 'Untitled',
          date: frontmatter.date || new Date().toISOString(),
          tags: frontmatter.tags || [],
          author: frontmatter.author || '3Dayg',
          excerpt: frontmatter.excerpt || generateExcerpt(content),
          content: content,
          slug: frontmatter.slug || slug,
          readTime: estimateReadingTime(content)
        }
        
        console.log('✅ Created post:', post.title)
        posts.push(post)
      } catch (fileError) {
        console.error(`💥 Error processing ${filename}:`, fileError)
      }
    }
    
    console.log('🎉 Total posts loaded:', posts.length)
    
    // Sort posts by date (newest first)
    return posts.sort((a, b) => new Date(b.date) - new Date(a.date))
    
  } catch (error) {
    console.error('💥 Error loading markdown posts:', error)
    console.error('Stack trace:', error.stack)
    return []
  }
}

/**
 * Generate an excerpt from markdown content
 */
function generateExcerpt(content, maxLength = 200) {
  // Remove markdown syntax and get plain text
  const plainText = content
    .replace(/^---[\s\S]*?---/, '') // Remove frontmatter
    .replace(/#{1,6}\s+/g, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/`(.*?)`/g, '$1') // Remove inline code
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // Remove links, keep text
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '') // Remove images
    .replace(/\n\s*\n/g, ' ') // Replace multiple newlines with space
    .replace(/\n/g, ' ') // Replace single newlines with space
    .trim()
  
  if (plainText.length <= maxLength) {
    return plainText
  }
  
  // Find the last complete sentence within the limit
  const truncated = plainText.substring(0, maxLength)
  const lastSentence = truncated.lastIndexOf('. ')
  
  if (lastSentence > maxLength * 0.5) {
    return truncated.substring(0, lastSentence + 1)
  }
  
  // If no good sentence break, truncate at word boundary
  const lastSpace = truncated.lastIndexOf(' ')
  return truncated.substring(0, lastSpace) + '...'
}

/**
 * Estimate reading time based on average reading speed
 */
function estimateReadingTime(content) {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return minutes
}
