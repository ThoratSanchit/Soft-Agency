import React from 'react'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import HowItWorks from '../components/HowItWorks'
import ProductGrid from '../components/ProductGrid'
import CustomProjectRequest from '../components/CustomProjectRequest'

const Home = ({ searchTerm, selectedCategory, setSelectedCategory }) => {
  return (
    <>
      <Hero />
      <Categories
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <HowItWorks />
      <ProductGrid
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
      />
      <CustomProjectRequest />
    </>
  )
}

export default Home
