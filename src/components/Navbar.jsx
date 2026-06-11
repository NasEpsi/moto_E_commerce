import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useCart } from '../hooks/useCart'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { itemCount } = useCart()

  function closeMenu() {
    setIsMenuOpen(false)
  }

  return (
    <header className="site-header">
      <div className="container navbar">
        <NavLink to="/" className="brand" onClick={closeMenu}>
          <span className="brand-mark">MP</span>
          <div>
            <strong>MotoParts</strong>
            <small>CATALOG</small>
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
            end
          >
            Accueil
          </NavLink>
          <NavLink
            to="/catalogue"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={closeMenu}
          >
            Catalogue
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={closeMenu}
          >
            Gestion
          </NavLink>
          <NavLink
            to="/panier"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={closeMenu}
          >
            Panier
            {itemCount > 0 ? <span className="nav-count">{itemCount}</span> : null}
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
