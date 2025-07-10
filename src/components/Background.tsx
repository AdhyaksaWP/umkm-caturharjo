import React from 'react'
import Image from 'next/image'

const Background = () => {
  return (
    <div className="absolute inset-0 -z-10">
        <Image
          src="/background.jpg" 
          alt="Background"
          fill
          className="object-cover"
          priority
        />
    </div>
  )
}

export default Background