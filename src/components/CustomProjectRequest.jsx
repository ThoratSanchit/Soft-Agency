import React, { useState } from 'react'
import './CustomProjectRequest.css'

const CustomProjectRequest = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    technology: '',
    timeline: '',
    budget: '',
    description: '',
    features: '',
    additionalRequirements: ''
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const projectTypes = [
    'Web Application',
    'Mobile App (Android)',
    'Mobile App (iOS)',
    'Desktop Application',
    'E-commerce Website',
    'Management System',
    'API Development',
    'Database Design',
    'Machine Learning Project',
    'Cybersecurity Tool',
    'Game Development',
    'Other'
  ]

  const technologies = [
    'React.js',
    'Vue.js',
    'Angular',
    'Node.js',
    'Python',
    'Java',
    'C#',
    'PHP',
    'Flutter',
    'React Native',
    'Swift',
    'Kotlin',
    'Unity',
    'TensorFlow',
    'Other'
  ]

  const timelines = [
    '1-2 weeks',
    '3-4 weeks',
    '1-2 months',
    '3-6 months',
    '6+ months'
  ]

  const budgetRanges = [
    '$50 - $100',
    '$100 - $250',
    '$250 - $500',
    '$500 - $1000',
    '$1000 - $2500',
    '$2500+'
  ]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Here you would typically send the data to your backend
    console.log('Custom Project Request:', formData)
    
    // For now, just show success message
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        technology: '',
        timeline: '',
        budget: '',
        description: '',
        features: '',
        additionalRequirements: ''
      })
    }, 3000)
  }

  if (isSubmitted) {
    return (
      <section id="custom-project-request" className="custom-project-request">
        <div className="custom-project-container">
          <div className="success-message">
            <div className="success-icon">✅</div>
            <h2>Request Submitted Successfully!</h2>
            <p>Thank you for your custom project request. Our team will review your requirements and get back to you within 24-48 hours.</p>
            <div className="success-details">
              <p><strong>What's Next?</strong></p>
              <ul>
                <li>Our team will analyze your requirements</li>
                <li>We'll prepare a detailed proposal with timeline and pricing</li>
                <li>You'll receive a personalized quote via email</li>
                <li>Upon approval, we'll start working on your project</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="custom-project-request" className="custom-project-request">
      <div className="custom-project-container">
        <div className="custom-project-header">
          <h2>Need a Custom Project?</h2>
          <p>Can't find what you're looking for? Let us create a custom software project tailored to your specific requirements.</p>
        </div>

        <div className="custom-project-content">
          <div className="custom-project-info">
            <h3>Why Choose Custom Development?</h3>
            <div className="benefits-list">
              <div className="benefit-item">
                <div className="benefit-icon">🎯</div>
                <div>
                  <h4>Tailored Solutions</h4>
                  <p>Projects built specifically for your requirements and use case</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">⚡</div>
                <div>
                  <h4>Fast Delivery</h4>
                  <p>Quick turnaround time with professional development practices</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">💎</div>
                <div>
                  <h4>Premium Quality</h4>
                  <p>Clean code, documentation, and best practices included</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">🔧</div>
                <div>
                  <h4>Full Support</h4>
                  <p>Complete source code, setup guide, and technical support</p>
                </div>
              </div>
            </div>
          </div>

          <div className="custom-project-form">
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="projectType">Project Type *</label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select project type</option>
                    {projectTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="technology">Preferred Technology *</label>
                  <select
                    id="technology"
                    name="technology"
                    value={formData.technology}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select technology</option>
                    {technologies.map((tech, index) => (
                      <option key={index} value={tech}>{tech}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="timeline">Expected Timeline *</label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select timeline</option>
                    {timelines.map((time, index) => (
                      <option key={index} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="budget">Budget Range *</label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select budget range</option>
                  {budgetRanges.map((range, index) => (
                    <option key={index} value={range}>{range}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="description">Project Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="4"
                  placeholder="Describe your project requirements in detail..."
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="features">Key Features Required</label>
                <textarea
                  id="features"
                  name="features"
                  value={formData.features}
                  onChange={handleChange}
                  rows="3"
                  placeholder="List the main features you need (e.g., user authentication, payment integration, etc.)"
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="additionalRequirements">Additional Requirements</label>
                <textarea
                  id="additionalRequirements"
                  name="additionalRequirements"
                  value={formData.additionalRequirements}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Any additional requirements, preferences, or special instructions..."
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                Submit Custom Project Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CustomProjectRequest
