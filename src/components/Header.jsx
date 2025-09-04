import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { searchProducts } from '../data'
import ThemeToggle from './ThemeToggle'
import './Header.css'
import { domain } from '../constants/domain'

const Header = ({ searchTerm, setSearchTerm }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const searchRef = useRef(null)
  const mobileSearchRef = useRef(null)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  // Generate search suggestions
  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      const results = searchProducts(searchTerm)
      setSuggestions(results.slice(0, 5)) // Show top 5 suggestions
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [searchTerm])

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target) &&
          mobileSearchRef.current && !mobileSearchRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      setShowSuggestions(false)
      closeMobileMenu()
      navigate('/projects')
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.title)
    setShowSuggestions(false)
    closeMobileMenu()
    navigate('/projects')
  }

  const handleInputChange = (value) => {
    setSearchTerm(value)
  }

  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true)
    }
  }

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo" onClick={closeMobileMenu}>
          <h1>{domain}</h1>
          <span className="tagline">Premium Software Projects</span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav ${isMobileMenuOpen ? 'nav-open' : ''}`}>
          {/* Mobile Search */}
          <div className="mobile-search" ref={mobileSearchRef}>
            <form onSubmit={handleSearch} className="mobile-search-form">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => handleInputChange(e.target.value)}
                onFocus={handleInputFocus}
                className="mobile-search-input"
              />
              <button type="submit" className="mobile-search-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </button>
            </form>
            
            {/* Mobile Search Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="search-suggestions mobile-suggestions">
                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <div className="suggestion-content">
                      <div className="suggestion-title">{suggestion.title}</div>
                      <div className="suggestion-category">{suggestion.category}</div>
                    </div>
                    <div className="suggestion-price">₹{suggestion.price}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Home
          </Link>
          <Link
            to="/projects"
            className={`nav-link ${location.pathname === '/projects' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Projects
          </Link>
          <Link
            to="/categories"
            className={`nav-link ${location.pathname === '/categories' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Categories
          </Link>
          <Link
            to="/about"
            className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Contact
          </Link>

          {/* Mobile Theme Toggle */}
          <div className="mobile-theme-toggle">
            <span className="mobile-theme-label">Theme</span>
            <ThemeToggle />
          </div>
        </nav>

        <div className="header-right">
          <div className="search-container" ref={searchRef}>
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => handleInputChange(e.target.value)}
                onFocus={handleInputFocus}
                className="search-input"
              />
              <button type="submit" className="search-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </button>
            </form>
            
            {/* Desktop Search Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="search-suggestions desktop-suggestions">
                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <div className="suggestion-content">
                      <div className="suggestion-title">{suggestion.title}</div>
                      <div className="suggestion-category">{suggestion.category}</div>
                    </div>
                    <div className="suggestion-price">₹{suggestion.price}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <ThemeToggle />
        </div>

        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div className="mobile-overlay" onClick={closeMobileMenu}></div>
        )}
      </div>
    </header>
  )
}

export default Header
