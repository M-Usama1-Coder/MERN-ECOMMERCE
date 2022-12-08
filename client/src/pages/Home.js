
import React from 'react'
import Annoucement from '../Components/Annoucement';
import Categories from '../Components/Categories';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import Newsletter from '../Components/Newsletter';
import Products from '../Components/Products';
import Slider from '../Components/Slider';

const Home = () => {
  return (
    <div>
        <Annoucement />
       	<Navbar />
       	<Slider />
        <Categories />
        <Products />
        <Newsletter />
        <Footer />
    </div>
  )
}

export default Home