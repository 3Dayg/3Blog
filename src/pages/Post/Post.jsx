import { useParams, Link } from '@tanstack/react-router'
import PostRenderer from '../../components/PostRenderer/PostRenderer'
import styles from './Post.module.css'

const Post = ({ posts = [] }) => {
  const { slug } = useParams()
  
  // Find the post by slug
  const post = posts.find(p => p.slug === slug)
  
  if (!post) {
    return (
      <div className={styles.post}>
        <div className={styles.container}>
          <div className={styles.notFound}>
            <h1>Post Not Found</h1>
            <p>The post you're looking for doesn't exist.</p>
            <Link to="/" className={styles.backLink}>
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.post}>
      <div className={styles.container}>
        {/* Navigation */}
        <nav className={styles.navigation}>
          <Link to="/" className={styles.backLink}>
            ← Back to All Posts
          </Link>
        </nav>

        {/* Post Content */}
        <main>
          <PostRenderer 
            content={post.content}
            metadata={{
              title: post.title,
              date: post.date,
              tags: post.tags,
              author: post.author,
              readTime: post.readTime
            }}
          />
        </main>

        {/* Related Posts or Navigation */}
        <section className={styles.relatedSection}>
          <h3 className={styles.relatedTitle}>More Posts</h3>
          <div className={styles.relatedLinks}>
            <Link to="/" className={styles.viewAllLink}>
              View All Posts →
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Post
