import React from 'react'

type Props = {
    params : {
        Nama: string,
        Alamat: string,
        Keterangan: string,
    },
    onClose: () => void
}

const UmkmPopup = ({ params: { Nama, Alamat, Keterangan }, onClose }: Props) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50 z-50' onClick={onClose}>
      <div className='w-96 h-64 bg-white rounded-lg shadow-lg p-6' onClick={(e) => e.stopPropagation()}>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-xl font-bold'>{Nama}</h1>
          <button 
            onClick={onClose}
            className='text-gray-500 hover:text-gray-700 text-2xl cursor-pointer'
          >
            ×
          </button>
        </div>
        <p className='mb-3'>{Keterangan}</p>
        <p className='text-gray-600'>Alamat: {Alamat}</p>
      </div>
    </div>
  )
}

export default UmkmPopup