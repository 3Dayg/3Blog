import { Link } from '@tanstack/react-router'
import styles from './Navbar.module.css'

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <h1>3Blog</h1>
        </Link>
        
        <div className={styles.navLinks}>
          <Link 
            to="/" 
            className={styles.navLink}
            activeProps={{
              className: styles.activeLink
            }}
          >
            Home
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
