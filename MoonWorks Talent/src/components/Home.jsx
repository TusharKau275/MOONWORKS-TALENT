import React from 'react'
import Navbar from './navbar.jsx'
import heroImg from '../assets/hero.png'

const Home = ({ children }) => {
    return (
        <div>
            <Navbar />
            <div className='w-1/2'>
              <img src={heroImg} alt="hero" />
            </div>
            {children}
        </div>
    )
}

export default Home