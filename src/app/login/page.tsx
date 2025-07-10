import Image from "next/image";
import Navbar from "@/components/Navbar";
import Background from "@/components/Background";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Footer from "@/components/Footer";
import { User } from "lucide-react";
import LoginForm from "@/components/LoginForm";

export default function Login() {
  

  return (
    <main className="min-h-screen flex flex-col">
      <Background/>
      <Navbar/>

      <section className="flex flex-1 justify-center items-center px-6">
        <div className="flex w-3/4 bg-white border-4 border-black rounded-2xl">
            <div className="flex w-1/2 items-center justify-center">
                <User className="w-80 h-80 p-10"/>
            </div>
            <div className="flex flex-col bg-black w-1/2 p-20 gap-3">
                <p className="text-4xl text-white font-bold">Halo Pengguna!</p>
                <p className="text-white">Masukkan kredensial dengan benar atau kontak admin untuk menambahkan UMKM pada website!</p>
                <LoginForm/>
            </div>
        </div>
      </section>

      <Footer/>
    </main>
  );
}
