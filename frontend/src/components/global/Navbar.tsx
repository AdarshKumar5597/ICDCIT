"use client";

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useHealthcareStore } from '@/zustand/useHealthcareStore';
import {useRouter} from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isLoggedIn = useHealthcareStore(state => state.loggedIn);
  const setIsLoggedIn = useHealthcareStore(state => state.setLoggedIn);
  const router = useRouter();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    router.replace('/');
    setIsLoggedIn(false);
  };

  return (
    <>
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-white'}`}>
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href='/' className="flex-shrink-0 flex items-center gap-3">
              <Image
                src="/icons/logo.png"
                alt="ICDCIT logo"
                width={100}
                height={100}
                className="object-contain w-14 h-14"
                loading='lazy'
              />
              <h1 className="text-2xl font-bold text-blue-600">
                ICDCIT
              </h1>
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className="hidden md:flex items-center gap-4 lg:gap-6">
              <Link href="/doctors/search" className="text-sm lg:text-base hover:text-blue-600 transition-colors">
                Doctor Consultations
              </Link>
              <Link href="/chatbot" className="text-sm lg:text-base hover:text-blue-600 transition-colors">
                Health Assistant
              </Link>

              <div className="relative group">
                <button className="flex items-center gap-1 py-2 group hover:text-blue-600 transition-colors">
                  <span>Your Activity</span>
                  <ChevronDown size={16} />
                </button>
                <div className="absolute top-full -left-4 w-48 bg-white shadow-lg rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <Link href="/community" className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-600 transition-colors">Community</Link>
                  <Link href="/requests" className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-600 transition-colors">Your Requests</Link>
                  <Link href="/feed" className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-600 transition-colors">Explore Feed</Link>
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-blue-700 transition-colors"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link href="/login" className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
                    Login
                  </Link>
                  <Link href="/signup" className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-blue-700 transition-colors">
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/30 z-[90]" onClick={() => setIsMenuOpen(false)} />
      )}

      <div
        className={`fixed inset-0 bg-white/95 backdrop-blur-sm transform z-[95] ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full px-4 pt-24 pb-6">
          <div className="flex flex-col gap-4">
            <Link onClick={() => setIsMenuOpen(false)} href="/doctors/search" className="text-lg hover:text-blue-600 transition-colors py-2">Doctor Consultations</Link>
            <Link onClick={() => setIsMenuOpen(false)} href="/chatbot" className="text-lg hover:text-blue-600 transition-colors py-2">Health Assistant</Link>
            <Link onClick={() => setIsMenuOpen(false)} href="/community" className="block text-lg hover:text-blue-600 transition-colors py-2">Community</Link>
            <Link onClick={() => setIsMenuOpen(false)} href="/requests" className="block text-lg hover:text-blue-600 transition-colors py-2">Your Requests</Link>
            <Link onClick={() => setIsMenuOpen(false)} href="/feed" className="block text-lg hover:text-blue-600 transition-colors py-2">Explore Feed</Link>
          </div>

          <div className="mt-auto space-y-4">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="block w-full text-center bg-blue-600 text-white py-3 rounded-full font-medium hover:bg-blue-700 transition-colors"
              >
                Logout
              </button>
            ) : (
              <>
                <Link href="/login" className="block w-full text-center text-blue-600 font-medium py-2 hover:text-blue-800 transition-colors">
                  Login
                </Link>
                <Link href="/signup" className="block w-full text-center bg-blue-600 text-white py-3 rounded-full font-medium hover:bg-blue-700 transition-colors">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;