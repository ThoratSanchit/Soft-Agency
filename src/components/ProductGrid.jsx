import React, { useState, useMemo } from 'react'
import { products, filterProducts, sortProducts } from '../data'
import './ProductGrid.css'
import { useNavigate } from 'react-router-dom'

const ProductGrid = ({ searchTerm, selectedCategory }) => {
  const [sortBy, setSortBy] = useState('popular')
  const navigate = useNavigate()

  const filteredProducts = useMemo(() => {
    // Create filter object
    const filters = {
      category: selectedCategory,
      search: searchTerm
    }
 
    // Filter products using the utility function
    let filtered = filterProducts(products, filters)

    // Sort products using the utility function
    filtered = sortProducts(filtered, sortBy)

    return filtered
  }, [searchTerm, selectedCategory, sortBy])

  return (
    <section className="product-grid-section">
      <div className="product-grid-container">
        <div className="section-header">
          <div className="section-title">
            <h2>Featured Projects</h2>
            <p>High-quality software projects ready for your academic success</p>
          </div>
          
          <div className="filters">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              {product.featured && <div className="featured-badge">Featured</div>}
              
              <div className="product-image">
                <img src={product.image} alt={product.title} />
                <div className="product-overlay">
                  <button className="btn-preview" onClick={() => navigate(`/projects/${product.id}`)}>See Details</button>
                  <button className="btn-demo" onClick={() => window.open(product.demoUrl, '_blank')}>Live Demo</button>
                </div>
              </div>

              <div className="product-content">
                <div className="product-header">
                  <h3 className="product-title" onClick={() => navigate(`/projects/${product.id}`)} style={{cursor:'pointer'}}>{product.title}</h3>
                  <span className="product-level">{product.level}</span>
                </div>
                
                <p className="product-description">{product.description}</p>
                
                <div className="product-technologies">
                  {product.technologies.slice(0, 3).map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                  {product.technologies.length > 3 && (
                    <span className="tech-more">+{product.technologies.length - 3}</span>
                  )}
                </div>

                
                <div className="product-footer">
                  <div className="product-price">
                    <span className="current-price">₹{product.price}</span>
                    <span className="original-price">₹{product.originalPrice}</span>
                  </div>
                  <button className="btn-buy">Buy Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-results">
            <h3>No projects found</h3>
            <p>Try adjusting your search or category filters</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProductGrid
