'use client'

import { ShoppingBag, Menu, X } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-black px-6 md:px-20 py-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <ShoppingBag className="text-white" />
          <p className="text-white font-bold text-xl md:text-2xl">
            UMKM Caturharjo
          </p>
        </Link>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white md:hidden focus:outline-none"
        >
          {isOpen ? <X /> : <Menu />}
        </button>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-10 text-white">
          <li><Link href="/">Beranda</Link></li>
          <li><Link href="/umkm">UMKM</Link></li>
          <li><Link href="/login">Login</Link></li>
        </ul>
      </div>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <ul className="mt-4 flex flex-col gap-4 text-white md:hidden">
          <li><Link href="/" onClick={() => setIsOpen(false)}>Beranda</Link></li>
          <li><Link href="/umkm" onClick={() => setIsOpen(false)}>UMKM</Link></li>
          <li><Link href="/login" onClick={() => setIsOpen(false)}>Login</Link></li>
        </ul>
      )}
    </nav>
  )
}

export default Navbar
