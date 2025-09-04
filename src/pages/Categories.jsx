import React from 'react'
import { Link } from 'react-router-dom'
import { categories, products, getCategoriesWithCounts } from '../data'
import './Categories.css'

const Categories = ({ selectedCategory, setSelectedCategory }) => {
  // Get categories with updated counts and filter out 'all' category for this page
  const detailedCategories = getCategoriesWithCounts(products).filter(cat => cat.id !== 'all')

  return (
    <div className="categories-page">
      <div className="categories-page-hero">
        <div className="categories-page-hero-container">
          <h1>Project Categories</h1>
          <p>Explore our diverse collection of software projects organized by technology and domain</p>
        </div>
      </div>

      <div className="categories-page-content">
        <div className="categories-page-container">
          <div className="categories-detailed-grid">
            {detailedCategories.map((category) => (
              <div key={category.id} className="category-detailed-card">
                <div className="category-detailed-header">
                  <div className="category-detailed-icon">{category.icon}</div>
                  <div className="category-detailed-info">
                    <h3>{category.name}</h3>
                    <span className="category-detailed-count">{category.count} projects</span>
                  </div>
                </div>
                
                <p className="category-detailed-description">{category.description}</p>
                
                <div className="category-detailed-technologies">
                  <h4>Popular Technologies:</h4>
                  <div className="tech-tags">
                    {category.technologies.map((tech, key) => (
                      <span key={key} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
                
                <div className="category-detailed-actions">
                  <Link 
                    to="/projects" 
                    className="btn-explore"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    Explore Projects
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Categories
