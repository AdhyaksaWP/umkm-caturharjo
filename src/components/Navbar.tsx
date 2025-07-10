import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-black flex flex-row justify-between py-4 px-20'>
      <Link href="/">
        <div className='flex items-center gap-2'>
          <ShoppingBag className='text-white' />
          <p className='text-white font-bold text-2xl'>UMKM Caturharjo</p>
        </div>
      </Link>

      <div className='flex items-center px-20'>
        <ul className='list-none text-white flex gap-10'>
            <li><Link href='/'>Beranda</Link></li>
            <li><Link href='/umkm'>UMKM</Link></li>
            <li><Link href='/login'>Login</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
