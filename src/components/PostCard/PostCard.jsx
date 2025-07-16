import { Link } from '@tanstack/react-router'
import styles from './PostCard.module.css'

const PostCard = ({ post }) => {
  const {
    title,
    excerpt,
    tags = [],
    date,
    slug,
    readTime,
    author = '3Dayg'
  } = post

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <article className={styles.postCard}>
      <Link to={`/post/${slug}`} className={styles.cardLink}>
        <div className={styles.content}>
          <div className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.meta}>
              <span className={styles.author}>By {author}</span>
              <span className={styles.separator}>•</span>
              <time className={styles.date} dateTime={date}>
                {formatDate(date)}
              </time>
              {readTime && (
                <>
                  <span className={styles.separator}>•</span>
                  <span className={styles.readTime}>{readTime} min read</span>
                </>
              )}
            </div>
          </div>

          {excerpt && (
            <p className={styles.excerpt}>{excerpt}</p>
          )}

          {tags.length > 0 && (
            <div className={styles.tags}>
              {tags.map(tag => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className={styles.readMore}>
          <span>Read more →</span>
        </div>
      </Link>
    </article>
  )
}

export default PostCard
