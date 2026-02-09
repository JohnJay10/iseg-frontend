import { useState } from 'react'
import { Link } from 'react-router-dom'
import logoImg from '../logo.png'
import './Navigation.css'

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo-wrapper" onClick={closeMenu}>
          <img src={logoImg} alt="ISEG/GGSD 2026 Logo" className="navbar-logo" />
          <div className="logo-text-wrapper">
            <h2 className="logo-title">14TH ISEG/GGSD MEGA SYMPOSIUM 2026</h2>
          </div>
        </Link>
        
        {/* Hamburger Menu Button */}
        <button className="hamburger-menu" onClick={toggleMenu} aria-label="Toggle menu">
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
        </button>

        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li><Link to="/" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/schedule" onClick={closeMenu}>Schedule</Link></li>
          <li><Link to="/safari-tour" onClick={closeMenu}>Safari Tour</Link></li>
          <li><Link to="/submit-abstract" onClick={closeMenu}>Call for Abstract</Link></li>
          <li><Link to="/register" onClick={closeMenu}>Register</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
