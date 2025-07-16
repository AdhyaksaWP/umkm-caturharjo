import Image from "next/image";
import Navbar from "@/components/Navbar";
import Background from "@/components/Background";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Background/>
      <Navbar/>

      <section className="flex flex-1 gap-x-50 justify-center items-center px-6">
        <div className="text-center md:text-left w-full max-w-md animate-fade-in">
          <p className="text-3xl md:text-5xl font-bold animate-slide-in-from-left">
            Selamat Datang di <span className="text-blue-400">UMKM</span>  Caturharjo!
          </p>
          <p className="text-lg text-justify mt-4 animate-slide-in-from-left animate-delay-300">
            Temukan dan dukung produk-produk unggulan dari para pelaku Usaha Mikro, Kecil, dan Menengah di Kalurahan Caturharjo, Sleman.
          </p>
          <Button className="mt-4 text-xl h-14 animate-slide-in-from-left animate-delay-700 hover:scale-105 transition-all duration-300 hover:shadow-lg cursor-pointer">
            <Link href='/umkm'>Telusuri UMKM</Link>
          </Button>
        </div>
        <div className="hidden md:block animate-slide-in-from-right animate-delay-500 hover:scale-105 transition-transform duration-500">
          <Link
            href="https://www.google.com/maps/place/Caturharjo,+Sleman,+Sleman+Regency,+Special+Region+of+Yogyakarta/@-7.688155,110.3244404,14z/data=!3m1!4b1!4m6!3m5!1s0x2e7af58ed7c522ab:0x5027a76e35696b0!8m2!3d-7.6900915!4d110.3249238!16s%2Fg%2F121v8hd0?entry=ttu&g_ep=EgoyMDI1MDYzMC4wIKXMDSoASAFQAw%3D%3D"
          >
            <Image
              src="/map.svg"
              alt="Caturharjo Map"
              width={400}
              height={400}
              className="hover:brightness-110 transition-all duration-300"
            />
          </Link>
        </div>
      </section>

      <Footer/>
    </main>
  );
}