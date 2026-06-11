import { useState } from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function closeMenu() {
    setIsMenuOpen(false)
  }

  return (
    <header className="site-header">
      <div className="container navbar">
        <NavLink to="/" className="brand" onClick={closeMenu}>
          <span className="brand-mark">MP</span>
          <div>
            <strong>MotoParts Catalog</strong>
            <small>Catalogue de pieces moto</small>
          </div>
        </NavLink>

        <button
          type="button"
          className="menu-toggle"
          onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
          aria-expanded={isMenuOpen}
          aria-label="Ouvrir le menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav-links ${isMenuOpen ? 'nav-links-open' : ''}`}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={closeMenu}
          >
            Accueil
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={closeMenu}
          >
            Gestion catalogue
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
