'use client';

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Background from "@/components/Background";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Popups from "@/components/Popups";
import { Input } from "@/components/ui/input";
import { ComboboxDemo } from "@/components/ComboBox";
import { Textarea } from "@/components/ui/textarea";
import { CldUploadButton } from 'next-cloudinary';

export default function UMKMEntryPage() {
  const [showAddUmkmPopup, setShowAddUmkmPopup] = useState<Boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const { data:session } = useSession(); 
  
  const handleClosePopup = () => {
    setShowAddUmkmPopup(false);
  }

  const handleUpload = (result: any) => {
    const info = (result as any).info;
    console.log("Cloudinary upload success:", info);
    setImageUrl(info.secure_url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    const body = {
      Nama: formData.get('Nama'),
      Tipe: formData.get('Tipe'),
      Alamat: formData.get('Alamat'),
      Keterangan: formData.get('Keterangan'),
      Gambar: imageUrl,
    };

    const res = await fetch('/api/umkm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const result = await res.json(); 

    if (res.ok) {
      alert('UMKM berhasil ditambahkan!');
    } else {
      console.error("API error:", result); 
      alert(`Gagal menambahkan UMKM: ${result?.error || result?.erorr || 'Unknown error'}`);
    }
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar/>
      <Background/>

      <section className="flex flex-col items-center justify-center flex-1 gap-10">
        <div className=" flex flex-col gap-3 items-center justify-center animate-fade-in-down">
            <p className="text-2xl md:text-4xl font-bold animate-bounce">Telusuri UMKM Caturharjo!</p>
            <div className="bg-black w-64 md:w-96 h-1 "></div>
        </div>

        <div className="flex flex-row gap-x-5 md:gap-x-10 px-5 md:px-0 animate-fade-in-up animate-delay-700">
          <Link
            href="/umkm/Produk"
            className=" hover:scale-110 transition-all duration-300 hover:shadow-2xl"
          >
            <Image
              src="/produk section.svg"
              alt="Produk Button"
              width={200}
              height={200}
              style={{ height: 'auto' }}
              className="hover:brightness-110 transition-all duration-300"
            />
          </Link>
          <Link
            href="/umkm/Kerajinan"
            className=" animate-delay-300 hover:scale-110 transition-all duration-300 hover:shadow-2xl"
          >
            <Image
                src="/kerajinan section.svg"
                alt="Kerajinan Button"
                width={200}
                height={200}
                style={{ height: 'auto' }}
                className="hover:brightness-110 transition-all duration-300"
            />
          </Link>
          <Link
            href="/umkm/Jasa"
            className=" animate-delay-500 hover:scale-110 transition-all duration-300 hover:shadow-2xl"
          >
            <Image
                src="/jasa section.svg"
                alt="Jasa Button"
                width={200}
                height={200}
                style={{ height: 'auto' }}
                className="hover:brightness-110 transition-all duration-300"
            />
          </Link>
        </div>
        {session && (
          <Button 
            className="mt-4 text-xl h-14 w-64 cursor-pointer animate-slide-in-from-left animate-delay-700 hover:scale-105 transition-all duration-300 hover:shadow-lg"
            onClick={() => setShowAddUmkmPopup(true)}
          >
            Daftar UMKM
          </Button>
        )}
      </section>
      {showAddUmkmPopup && (
        <Popups 
          params={{
            Title: "Daftar UMKM",
            Width: "min-w-1/2 max-w-screen-sm",
            Height: "max-h-[100vh]",
          }}
          onClose={handleClosePopup}>
          <form onSubmit={handleSubmit} className='flex flex-col gap-y-3'>
            <p>Nama UMKM</p>
            <Input name='Nama' required />

            <p>Tipe UMKM</p>
            <ComboboxDemo name='Tipe' />

            <p>Deskripsi UMKM</p>
            <Textarea name='Keterangan' />

            <p>Alamat UMKM</p>
            <Input name='Alamat' />

            <p>Gambar UMKM</p>
            <CldUploadButton
              options={{ cloudName: "dpucorv83" }}
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
      <Footer/>
    </main>
  );
}