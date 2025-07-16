import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import styles from './PostRenderer.module.css'

const PostRenderer = ({ content, metadata }) => {
  const {
    title,
    date,
    tags = [],
    author = '3Dayg',
    readTime
  } = metadata || {}

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <article className={styles.postRenderer}>
      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        
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

        {tags.length > 0 && (
          <div className={styles.tags}>
            {tags.map(tag => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className={styles.content}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            // Custom rendering for specific elements
            h1: ({ children }) => <h1 className={styles.mdH1}>{children}</h1>,
            h2: ({ children }) => <h2 className={styles.mdH2}>{children}</h2>,
            h3: ({ children }) => <h3 className={styles.mdH3}>{children}</h3>,
            h4: ({ children }) => <h4 className={styles.mdH4}>{children}</h4>,
            h5: ({ children }) => <h5 className={styles.mdH5}>{children}</h5>,
            h6: ({ children }) => <h6 className={styles.mdH6}>{children}</h6>,
            p: ({ children }) => <p className={styles.mdParagraph}>{children}</p>,
            code: ({ inline, children }) => 
              inline ? (
                <code className={styles.mdInlineCode}>{children}</code>
              ) : (
                <code className={styles.mdCodeBlock}>{children}</code>
              ),
            pre: ({ children }) => <pre className={styles.mdPre}>{children}</pre>,
            blockquote: ({ children }) => <blockquote className={styles.mdBlockquote}>{children}</blockquote>,
            ul: ({ children }) => <ul className={styles.mdUl}>{children}</ul>,
            ol: ({ children }) => <ol className={styles.mdOl}>{children}</ol>,
            li: ({ children }) => <li className={styles.mdLi}>{children}</li>,
            a: ({ href, children }) => (
              <a 
                href={href} 
                className={styles.mdLink}
                target={href?.startsWith('http') ? '_blank' : undefined}
                rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {children}
              </a>
            ),
            table: ({ children }) => (
              <div className={styles.tableWrapper}>
                <table className={styles.mdTable}>{children}</table>
              </div>
            ),
            th: ({ children }) => <th className={styles.mdTh}>{children}</th>,
            td: ({ children }) => <td className={styles.mdTd}>{children}</td>,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </article>
  )
}

export default PostRenderer
