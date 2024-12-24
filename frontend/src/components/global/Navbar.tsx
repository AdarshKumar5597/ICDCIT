"use client";
import Image from 'next/image';
import React, { useState } from 'react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <nav className='w-full h-20 bg-white shadow-md flex flex-row justify-between items-center px-8 fixed top-0'>
      <div className='text-2xl font-bold text-blue-600 flex flex-row gap-2 justify-center items-center'>
        <Image src={"/logo.png"} alt='logo' width={100} height={100} />
        <h1>
          ICDCIT
        </h1>
      </div>

      <button
        className='md:hidden z-50'
        onClick={toggleMenu}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      <div className={`md:hidden fixed inset-0 bg-white transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out pt-20`}>
        <div className='flex flex-col items-center gap-8 p-8'>
          <a href="/" className='hover:text-blue-600 transition-colors'>Home</a>
          <a href="/" className='hover:text-blue-600 transition-colors'>Services</a>
          <a href="/" className='hover:text-blue-600 transition-colors'>About</a>
          <a href="/" className='hover:text-blue-600 transition-colors'>Career</a>
          <a href="/" className='hover:text-blue-600 transition-colors'>Contact us</a>
          <div className='flex flex-col gap-4 items-center'>
            <a href="/" className='text-blue-600 font-bold hover:text-blue-800 transition-colors'>Login</a>
            <a href="/" className='bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors'>Signup</a>
          </div>
        </div>
      </div>

      <div className='hidden md:flex gap-8 items-center'>
        <a href="/" className='hover:text-blue-600 transition-colors'>Home</a>
        <a href="/" className='hover:text-blue-600 transition-colors'>Services</a>
        <a href="/" className='hover:text-blue-600 transition-colors'>About</a>
        <a href="/" className='hover:text-blue-600 transition-colors'>Career</a>
        <a href="/" className='hover:text-blue-600 transition-colors'>Contact us</a>
      </div>

      <div className='hidden md:flex gap-4 items-center'>
        <a href="/" className='text-blue-600 hover:text-blue-800 transition-colors'>Login</a>
        <a href="/" className='bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors'>Signup</a>
      </div>
    </nav>
  )
}

export default Navbar
