'use client';

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Background from "@/components/Background";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Footer from "@/components/Footer";
import { User } from "lucide-react";
import LoginForm from "@/components/LoginForm";
import { signOut, useSession } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession();

  return (
    <main className="min-h-screen flex flex-col">
      <Background/>
      <Navbar/>

      <section className="flex flex-1 justify-center items-center p-5 md:px-6">
        <div className="flex md:w-3/4 bg-white border-4 border-black rounded-2xl">
            <div className="hidden md:flex w-1/2 items-center justify-center">
                <User className="w-80 h-80 p-10"/>
            </div>
            {!session ?
              (<div className="flex flex-col bg-black w-full md:w-1/2 p-20 gap-3">
                  <p className="text-2xl md:text-4xl text-white font-bold">Halo Pengguna!</p>
                  <p className="text-white">Masukkan kredensial dengan benar atau kontak admin untuk menambahkan UMKM pada website!</p>
                  <LoginForm/>
              </div>
              ): (
              <div className="flex flex-col bg-black w-full md:w-1/2 p-20 gap-3">
                <p className="text-2xl md:text-4xl text-white font-bold">Halo Pengguna!</p>
                <p className="text-white">Anda sudah masuk dan memiliki akses untuk menambah, 
                  mengubah, dan menghapus umkm yang terdaftar pada situs. Silahkan klik salah satu tombol
                  dibawah untuk pindah ke halaman UMKM atau Keluar akun admin</p>
                <Button className="mt-4 text-xl h-14 animate-slide-in-from-left animate-delay-700 hover:scale-105 transition-all duration-300 hover:shadow-lg cursor-pointer">
                  <Link href='/umkm'>Telusuri UMKM</Link>
                </Button>
                <Button 
                  className="mt-4 text-xl h-14 animate-slide-in-from-left animate-delay-700 hover:scale-105 transition-all duration-300 hover:shadow-lg cursor-pointer"
                  variant={"destructive"}
                  onClick={() => signOut()}
                  >
                    Log Out
                </Button>
              </div>
              )
            }
              
        </div>
      </section>

      <Footer/>
    </main>
  );
}
