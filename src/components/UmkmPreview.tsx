'use client';

import { Edit } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image'
import React, { useState } from 'react'
import { EditDropdown } from './EditDropdown';
import Popups from './Popups';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { ComboboxDemo } from './ComboBox';
import { CldUploadButton } from 'next-cloudinary';

type Props = {
    params : {
        id: string,
        Nama: string,
        Tipe: string,
        Alamat: string,
        Keterangan: string,
        Gambar: string,
    },
    onClick: () => void
}

const UmkmPreview = ({params: {id, Nama, Tipe, Alamat, Keterangan, Gambar}, onClick} : Props) => {
  const [showEditUmkmPopup, setShowEditUmkmPopup] = useState<Boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleUpload = (result: any) => {
    const info = (result as any).info;
    console.log("Cloudinary upload success:", info);
    setImageUrl(info.secure_url);
  };

  const handleShowEditUmkmPopup = () => {
    setShowEditUmkmPopup(true);
  }

  const handleClosePopup = () => {
    setShowEditUmkmPopup(false);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    const body = {
      Nama: formData.get('Nama'),
      Tipe: formData.get('Tipe'),
      Alamat: formData.get('Alamat'),
      Keterangan: formData.get('Keterangan'),
    };

    const res = await fetch(`/api/umkm/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })

        const result = await res.json(); 

    if (res.ok) {
      alert('UMKM berhasil diubah!');
    } else {
      console.error("API error:", result); 
      alert(`Gagal mengubah UMKM: ${result?.error || result?.erorr || 'Unknown error'}`);
    }
  }

  const deleteUMKM = async() => {
      const res = await fetch(`/api/umkm/${id}`, {
        method: "DELETE",
      })
  }

  const { data: session } = useSession();
  return (
    <>
      <div 
        className={`relative w-80 h-48 cursor-pointer hover:scale-105 transition-transform duration-200`}
        >
        {session && (
          <div className='absolute right-4 top-2'>
            <EditDropdown onEdit={handleShowEditUmkmPopup} onDelete={deleteUMKM} />
          </div>
        )}
        <Image
          src={Gambar?.trim() || "/shop placeholder.jpg"}
          alt="shop image"
          width={320}
          height={150}
          className="border-4 border-black rounded-2xl w-full h-full object-cover"
          onClick={onClick}
        />
        <div className="w-full absolute bottom-0" onClick={onClick}>
          <p className="bg-white bg-opacity-90 px-3 py-2 text-xl font-semibold rounded-lg shadow-lg">
            {Nama}
          </p>
        </div>
      </div>  
      {showEditUmkmPopup && (
        <Popups 
          params={{
            Title: "Edit UMKM",
            Width: "min-w-1/2 max-w-screen-sm",
            Height: "max-h-[100vh]",
          }}
          onClose={handleClosePopup}>
          <form className='flex flex-col gap-y-3' onSubmit={handleSubmit}>
  
              <p>Nama UMKM</p>
              <Input name='Nama' defaultValue={Nama}></Input>
  
              <p>Tipe UMKM</p>
              <ComboboxDemo name='Tipe' defaultValue={Tipe}></ComboboxDemo>
  
              <p>Keterangan UMKM</p>
              <Textarea name='Keterangan' defaultValue={Keterangan}></Textarea>
  
              <p>Alamat UMKM</p>
              <Input name='Alamat' defaultValue={Alamat}></Input>
  
              <p>Gambar UMKM</p>
              <CldUploadButton
                uploadPreset="umkm-caturharjo" 
                onSuccess={(result) => {handleUpload(result)}}
                className="bg-black text-white px-4 py-2 rounded cursor-pointer animate-slide-in-from-left animate-delay-700 hover:scale-105  transition-all hover:bg-gray-800 duration-300 hover:shadow-lg"
              >
                Upload Image
              </CldUploadButton>

              {imageUrl && <img src={imageUrl} alt='UMKM Preview' className='w-32 mt-2' />}

              <button type='submit' className='bg-green-500 px-4 py-2 text-white rounded animate-slide-in-from-left animate-delay-700 hover:scale-105 hover:bg-green-300 transition-all duration-300 hover:shadow-lg cursor-pointer'>
                Submit
              </button>
          </form>
        </Popups>
      )}
    </>
  )
}

export default UmkmPreview