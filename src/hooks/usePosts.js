import { useState, useEffect } from 'react'
import { 
  generateSlug, 
  estimateReadingTime, 
  generateExcerpt,
  sortPostsByDate 
} from '../utils/postHelpers'

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
        setLoading(true)
        
        // This is where you would load your markdown files
        // For now, we'll use sample data
        const samplePosts = [
          {
            title: "Getting Started with React",
            date: "2024-01-15",
            tags: ["React", "JavaScript", "Web Development"],
            author: "3Dayg",
            content: `# Getting Started with React

React is a powerful JavaScript library for building user interfaces. In this post, we'll explore the basics of React and how to get started with your first component.

## What is React?

React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called "components".

## Creating Your First Component

Here's a simple example of a React component:

\`\`\`jsx
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}
\`\`\`

This component accepts a single "props" object argument with data and returns a React element.

## Key Concepts

- **Components**: The building blocks of React applications
- **JSX**: A syntax extension for JavaScript
- **Props**: How data flows down to components
- **State**: How components manage their internal data

React makes it painless to create interactive UIs and manage complex application state.`,
            slug: "getting-started-with-react"
          },
          {
            title: "CSS Modules in Modern Web Development",
            date: "2024-01-10",
            tags: ["CSS", "Frontend", "Styling"],
            author: "3Dayg",
            content: `# CSS Modules in Modern Web Development

CSS Modules provide a way to write CSS that's locally scoped by default. This eliminates many of the issues that come with global CSS.

## Benefits of CSS Modules

1. **Local scope by default**: No more naming conflicts
2. **Explicit dependencies**: Clear relationships between CSS and JS
3. **Dead code elimination**: Unused styles can be detected
4. **Minified class names**: Smaller bundle sizes in production

## How to Use CSS Modules

CSS Modules work by transforming class names into unique identifiers:

\`\`\`css
/* Button.module.css */
.button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
}

.primary {
  background-color: #007bff;
  color: white;
}
\`\`\`

\`\`\`jsx
// Button.jsx
import styles from './Button.module.css'

function Button({ children, primary }) {
  return (
    <button className={\`\${styles.button} \${primary ? styles.primary : ''}\`}>
      {children}
    </button>
  )
}
\`\`\`

CSS Modules make styling more maintainable and predictable in large applications.`,
            slug: "css-modules-modern-web-development"
          },
          {
            title: "The Future of JavaScript",
            date: "2024-01-05",
            tags: ["JavaScript", "ES2024", "Programming"],
            author: "3Dayg",
            content: `# The Future of JavaScript

JavaScript continues to evolve rapidly, with new features and capabilities being added regularly. Let's explore what's coming next.

## Recent Additions

JavaScript has seen many exciting additions in recent years:

- **Optional Chaining**: Safely access nested object properties
- **Nullish Coalescing**: Better handling of null and undefined values
- **BigInt**: Support for arbitrarily large integers
- **Dynamic Imports**: Load modules on demand

## Looking Ahead

The future of JavaScript looks bright with several proposals in the pipeline:

### Pattern Matching
\`\`\`javascript
match (value) {
  when Number if value > 0 -> 'positive'
  when Number if value < 0 -> 'negative'
  when 0 -> 'zero'
  when String -> 'text'
  else -> 'unknown'
}
\`\`\`

### Records and Tuples
Immutable data structures coming to JavaScript:

\`\`\`javascript
const record = #{ name: "John", age: 30 }
const tuple = #[1, 2, 3, 4, 5]
\`\`\`

These features will make JavaScript even more powerful and expressive for modern web development.`,
            slug: "future-of-javascript"
          }
        ]

        // Process the sample posts
        const processedPosts = samplePosts.map(post => {
          const excerpt = generateExcerpt(post.content)
          const readTime = estimateReadingTime(post.content)
          
          return {
            ...post,
            excerpt,
            readTime,
            slug: post.slug || generateSlug(post.title)
          }
        })

        // Sort posts by date (newest first)
        const sortedPosts = sortPostsByDate(processedPosts)
        
        setPosts(sortedPosts)
        setError(null)
      } catch (err) {
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
