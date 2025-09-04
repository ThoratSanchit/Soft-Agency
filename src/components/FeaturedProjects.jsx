import React from 'react'
import { getFeaturedProducts } from '../data'
import { formatPrice, calculateDiscount } from '../utils/dataUtils'
import './FeaturedProjects.css'

const FeaturedProjects = () => {
  // Get featured products and limit to top 6
  const featuredProducts = getFeaturedProducts().slice(0, 6)

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star filled">★</span>)
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>)
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">★</span>)
    }

    return stars
  }

  return (
    <section className="featured-projects">
      <div className="featured-projects-container">
        <div className="featured-projects-header">
          <h2>Featured Projects</h2>
          <p>High-quality software projects ready for your academic success</p>
        </div>

        <div className="featured-grid">
          {featuredProducts.map((project) => {
            const discount = calculateDiscount(project.originalPrice, project.price)
            
            return (
              <div key={project.id} className="featured-card">
                <div className="featured-card-image">
                  <img src={project.image} alt={project.title} />
                  <div className="featured-badge">Featured</div>
                  {discount > 0 && (
                    <div className="discount-badge">-{discount}%</div>
                  )}
                  <div className="card-overlay">
                    <button className="btn-view-details">View Details</button>
                    <button className="btn-quick-preview">Quick Preview</button>
                  </div>
                </div>

                <div className="featured-card-content">
                  <div className="project-level">{project.level}</div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>

                  <div className="project-technologies">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="tech-more">+{project.technologies.length - 3}</span>
                    )}
                  </div>

                  <div className="project-stats">
                    <div className="rating">
                      <div className="stars">
                        {renderStars(project.rating)}
                      </div>
                      <span className="rating-text">{project.rating} ({project.reviews})</span>
                    </div>
                    <div className="downloads">
                      <span className="download-icon">⬇</span>
                      <span>{project.downloadCount}</span>
                    </div>
                  </div>

                  <div className="project-pricing">
                    <div className="price-container">
                      <span className="current-price">{formatPrice(project.price)}</span>
                      {project.originalPrice > project.price && (
                        <span className="original-price">{formatPrice(project.originalPrice)}</span>
                      )}
                    </div>
                    <button className="btn-add-to-cart">Add to Cart</button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="featured-projects-footer">
          <button className="btn-view-all">View All Projects</button>
          <p className="footer-note">Discover 500+ premium projects across all categories</p>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProjects
