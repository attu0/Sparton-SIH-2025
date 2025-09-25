import { useState } from 'react'
import Toggle from './Toggle'
import styles from './Navbar.module.css'

function Navbar({ onLanguageChange, isEnglish }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* Logo/Brand */}
        <div className={styles.brand}>
          <h2 className={styles.brandText}>
            {isEnglish ? 'Plant Disease Classifier' : 'वनस्पती रोग वर्गीकरण'}
          </h2>
        </div>

        {/* Desktop Navigation */}
        <div className={styles.navLinks}>
          <Toggle onLanguageChange={onLanguageChange} />
        </div>

        {/* Mobile Burger Menu */}
        <div className={styles.burger} onClick={toggleMenu}>
          <div className={`${styles.line} ${isMenuOpen ? styles.line1Active : ''}`}></div>
          <div className={`${styles.line} ${isMenuOpen ? styles.line2Active : ''}`}></div>
          <div className={`${styles.line} ${isMenuOpen ? styles.line3Active : ''}`}></div>
        </div>

        {/* Mobile Menu */}
        <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuActive : ''}`}>
          <div className={styles.mobileMenuContent}>
            <div className={styles.languageSection}>
              <span className={styles.languageLabel}>
                {isEnglish ? 'Language' : 'भाषा'}:
              </span>
              <Toggle onLanguageChange={onLanguageChange} />
            </div>
          </div>
        </div>

        {/* Overlay for mobile menu */}
        {isMenuOpen && (
          <div className={styles.overlay} onClick={closeMenu}></div>
        )}
      </div>
    </nav>
  )
}

export default Navbar