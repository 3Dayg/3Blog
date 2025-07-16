import styles from './Footer.module.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.branding}>
            <h3 className={styles.brandName}>3Blog</h3>
            <p className={styles.description}>
              Sharing thoughts, ideas, and experiences through the written word.
            </p>
          </div>
          
          <div className={styles.links}>
            <div className={styles.linkSection}>
              <a 
                href="https://github.com/3Dayg" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Visit my GitHub profile"
                className={styles.externalLink}
              >
                GitHub
              </a>
              <a 
                href="https://www.linkedin.com/in/alvarez-matias-n/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Connect with me on LinkedIn"
                className={styles.externalLink}
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p>&copy; {currentYear} 3Blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
