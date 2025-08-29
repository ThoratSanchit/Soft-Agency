import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { getProductById } from '../data'
import './ProjectDetails.css'

const ProjectDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = getProductById(id)

  if (!product) {
    return (
      <div className="project-details not-found">
        <div className="not-found-container">
          <div className="not-found-icon">🔍</div>
          <h2>Project not found</h2>
          <p>The project you're looking for doesn't exist or has been removed.</p>
          <button className="btn-back" onClick={() => navigate(-1)}>Go Back</button>
        </div>
      </div>
    )
  }

  // Calculate discount percentage
  const discountPercentage = Math.round((1 - product.price / product.originalPrice) * 100)

  return (
    <div className="project-details">
      {/* Hero Section */}
      <div className="details-hero">
        <div className="details-hero-container">
          <div className="project-breadcrumb">
            <span onClick={() => navigate('/')} className="breadcrumb-link">Home</span>
            <span className="breadcrumb-separator">/</span>
            <span onClick={() => navigate(`/category/${product.category}`)} className="breadcrumb-link">
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">{product.title}</span>
          </div>
          
          <div className="hero-content">
            <div className="hero-info">
              <div className="project-badge">
                {product.featured && <span className="badge featured">Featured</span>}
                <span className="badge category">{product.category}</span>
                <span className="badge level">{product.level}</span>
              </div>
              
              <h1>{product.title}</h1>
              <p className="subtitle">{product.description}</p>
              
              <div className="project-stats">
                <div className="stat">
                  <span className="stat-value">⭐ {product.rating}</span>
                  <span className="stat-label">({product.reviews} reviews)</span>
                </div>
                <div className="stat">
                  <span className="stat-value">📥 {product.downloadCount}</span>
                  <span className="stat-label">downloads</span>
                </div>
                <div className="stat">
                  <span className="stat-value">📅 {product.lastUpdated}</span>
                  <span className="stat-label">last updated</span>
                </div>
              </div>
            </div>
            
            {/* Removed duplicate hero image to avoid double rendering; preview section shows it. */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="details-container">
        <div className="details-main">
          {/* Project Preview */}
          <div className="preview-section">
            <div className="section-header">
              <h2>Project Preview</h2>
            </div>
            <div className="cover">
              <img src={product.image} alt={product.title} />
              {product.demoUrl && (
                <a href={product.demoUrl} target="_blank" rel="noreferrer" className="demo-overlay">
                  <span className="demo-icon">▶</span>
                  <span>View Live Demo</span>
                </a>
              )}
            </div>
          </div>

          {/* Project Details */}
          <div className="details-section">
            <div className="section-header">
              <h2>Project Details</h2>
            </div>
            <div className="markdown">
              <ReactMarkdown>{product.details || ''}</ReactMarkdown>
            </div>
          </div>

          {/* Full Synopsis */}
          {product.synopsis && (
            <div className="synopsis-section">
              <div className="markdown synopsis">
                <ReactMarkdown>{product.synopsis}</ReactMarkdown>
              </div>
            </div>
          )}

          {/* Tech Stack */}
          <div className="tech-section">
            <div className="section-header">
              <h2>Technology Stack</h2>
            </div>
            <div className="tech-grid">
              {product.technologies.map((tech, index) => (
                <div key={index} className="tech-item">
                  <div className="tech-icon">{getTechIcon(tech)}</div>
                  <span className="tech-name">{tech}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="features-section">
            <div className="section-header">
              <h2>Key Features</h2>
            </div>
            <div className="features-grid">
              {extractFeatures(product.details).map((feature, index) => (
                <div key={index} className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="details-sidebar">
          {/* Pricing Card */}
          <div className="price-card">
            <div className="discount-badge">Save {discountPercentage}%</div>
            <div className="prices">
              <span className="current">₹{product.price}</span>
              <span className="original">₹{product.originalPrice}</span>
            </div>
            <p className="price-info">One-time purchase with lifetime updates</p>
            
            <div className="purchase-buttons">
              <button className="btn-primary">
                <span className="btn-icon">🛒</span>
                Buy Now
              </button>
              {product.demoUrl && (
                <a className="btn-secondary" href={product.demoUrl} target="_blank" rel="noreferrer">
                  <span className="btn-icon">👁️</span>
                  Live Demo
                </a>
              )}
            </div>
            
            <div className="guarantee">
              <span className="guarantee-icon">🔒</span>
              <span>30-day money-back guarantee</span>
            </div>
          </div>

          {/* Tech Stack Card */}
          <div className="meta-card">
            <h4>Tech Stack</h4>
            <div className="tags">
              {product.technologies.map((t, i) => (
                <span key={i} className="tag">{t}</span>
              ))}
            </div>
          </div>

          {/* Includes Card */}
          <div className="meta-card">
            <h4>What's Included</h4>
            <ul>
              {product.sourceFiles?.map((f, i) => (
                <li key={i}>
                  <span className="check-icon">✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Requirements Card */}
          <div className="meta-card">
            <h4>Requirements</h4>
            <ul>
              {product.requirements?.map((r, i) => (
                <li key={i}>
                  <span className="requirement-icon">⚙️</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* Support Card */}
          <div className="meta-card support-card">
            <h4>Need Help?</h4>
            <p>Our support team is available 24/7 to assist you with any questions.</p>
            <button className="btn-support">Contact Support</button>
          </div>
        </aside>
      </div>

      {/* Related Projects Section */}
      <div className="related-projects">
        <div className="related-header">
          <h2>Related Projects</h2>
          <button className="view-all">View All</button>
        </div>
        <div className="related-grid">
          {/* This would be populated with related projects */}
          <div className="related-placeholder">
            <p>Related projects will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper function to get tech icon
const getTechIcon = (tech) => {
  const icons = {
    'React': '⚛️',
    'Node.js': '🟢',
    'MongoDB': '🍃',
    'Stripe': '💳',
    'Flutter': '🦋',
    'Firebase': '🔥',
    'Google Maps': '🗺️',
    'Razorpay': '💰',
    'Python': '🐍',
    'TensorFlow': '🧠',
    'Pandas': '🐼',
    'Nmap': '🔍',
    'Scapy': '📦',
    'Vue.js': '💚',
    'Express.js': '🚂',
    'PostgreSQL': '🐘',
    'Chart.js': '📊',
    'Solidity': '💎',
    'Web3.js': '🌐',
    'Truffle': '🍫',
    'Socket.io': '🔌',
    'WebRTC': '📹',
    'React Native': '📱',
    'Redux': '♻️',
    'PyTorch': '🔥',
    'OpenCV': '👁️',
    'FastAPI': '⚡',
    'Next.js': '▲',
    'TypeScript': '🔷',
    'Prisma': '🔮',
    'SQLite': '📜'
  }
  return icons[tech] || '🔧'
}

// Helper function to extract features from details
const extractFeatures = (details) => {
  if (!details) return []
  
  // Simple extraction - in a real app, this would be more sophisticated
  const features = []
  const lines = details.split('\n')
  
  let inFeaturesSection = false
  for (const line of lines) {
    if (line.includes('## Features')) {
      inFeaturesSection = true
      continue
    }
    
    if (inFeaturesSection && line.startsWith('- ')) {
      features.push(line.substring(2))
    } else if (inFeaturesSection && line.startsWith('##')) {
      break
    }
  }
  
  return features.length > 0 ? features : [
    'Complete source code',
    'Documentation',
    'Installation guide',
    'Technical support'
  ]
}

export default ProjectDetails