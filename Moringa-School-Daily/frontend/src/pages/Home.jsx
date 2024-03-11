import React from 'react'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import QuickActions from '../components/QuickActions'
import Posts from '../components/Posts'
import Categories from '../components/Categories'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <QuickActions />
      <Hero />
      <Categories />
      <Posts />
      <Footer />
    </>
  )
}
