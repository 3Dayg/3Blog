import React, { createContext } from 'react'
import { usePosts } from '../hooks/usePosts'

// Create the Posts Context
export const PostsContext = createContext({
  posts: [],
  loading: false,
  error: null
})

// Posts Provider Component
export function PostsProvider({ children }) {
  const postsData = usePosts()
  
  console.log('📦 PostsProvider - providing posts:', postsData.posts.length)
  
  return (
    <PostsContext.Provider value={postsData}>
      {children}
    </PostsContext.Provider>
  )
}
