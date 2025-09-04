import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import './App.css'
import './styles/themes.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Categories from './pages/Categories'
import About from './pages/About'
import Contact from './pages/Contact'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <Header
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <main className="main-content">
            <Routes>
              <Route path="/" element={
                <Home
                  searchTerm={searchTerm}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              } />
              <Route path="/projects" element={
                <Projects
                  searchTerm={searchTerm}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              } />
              <Route path="/categories" element={
                <Categories
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              } />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
