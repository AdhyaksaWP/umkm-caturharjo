import Image from 'next/image'
import React from 'react'

type Props = {
    params : {
        id: string,
        Nama: string,
    },
    onClick: () => void
}

const UmkmPreview = ({params: {id, Nama}, onClick} : Props) => {
  return (
    <div 
      className={`relative w-80 h-48 umkm-id-${id} cursor-pointer hover:scale-105 transition-transform duration-200`}
      onClick={onClick}
    >
      <Image
        src="/shop placeholder.jpg"
        alt="shop placeholder image"
        width={320}
        height={150}
        className='border-4 border-black rounded-2xl w-full h-full object-cover'
      />
      <div className="w-full absolute bottom-0">
        <p className="bg-white bg-opacity-90 px-3 py-2 text-xl font-semibold rounded-lg shadow-lg">
          {Nama}
        </p>
      </div>
    </div>
  )
}

export default UmkmPreview