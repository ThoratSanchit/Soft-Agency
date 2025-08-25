import React from 'react'
import { useNavigate } from 'react-router-dom'
import { siteConfig } from '../data'
import './Hero.css'

const Hero = () => {
  const navigate = useNavigate()
  const { stats } = siteConfig

  const scrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works')
    if (element) {
      const headerHeight = document.querySelector('.header').offsetHeight
      const elementPosition = element.offsetTop - headerHeight - 20 // 20px extra padding

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }

  const handleBrowseProjects = () => {
    navigate('/projects')
  }

  const scrollToCustomRequest = () => {
    const element = document.getElementById('custom-project-request')
    if (element) {
      const headerHeight = document.querySelector('.header').offsetHeight
      const elementPosition = element.offsetTop - headerHeight - 20 // 20px extra padding

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Premium Software Projects for
            <span className="highlight"> Students & Developers</span>
          </h1>
          <p className="hero-description">
            Get high-quality, ready-to-use software projects for your academic needs.
            From web applications to mobile apps, find the perfect project to boost your portfolio.
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">{stats.projects}+</span>
              <span className="stat-label">Projects Available</span>
            </div>
            <div className="stat">
              <span className="stat-number">{(stats.students / 1000).toFixed(0)}k+</span>
              <span className="stat-label">Happy Students</span>
            </div>
            <div className="stat">
              <span className="stat-number">{stats.technologies}+</span>
              <span className="stat-label">Technologies</span>
            </div>
          </div>
          <div className="hero-actions">
            <button className="btn-hero-primary" onClick={handleBrowseProjects}>
              Browse Projects
            </button>
            <button className="btn-hero-secondary" onClick={scrollToHowItWorks}>
              How It Works
            </button>
            <button className="btn-hero-tertiary" onClick={scrollToCustomRequest}>
              Request Custom Project
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-card card-1">
            <div className="card-icon">💻</div>
            <h3>Web Development</h3>
            <p>React, Vue, Angular projects</p>
          </div>
          <div className="floating-card card-2">
            <div className="card-icon">📱</div>
            <h3>Mobile Apps</h3>
            <p>iOS, Android, React Native</p>
          </div>
          <div className="floating-card card-3">
            <div className="card-icon">🔒</div>
            <h3>Cybersecurity</h3>
            <p>Security tools & frameworks</p>
          </div>
          <div className="floating-card card-4">
            <div className="card-icon">🤖</div>
            <h3>AI/ML Projects</h3>
            <p>Machine Learning models</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
