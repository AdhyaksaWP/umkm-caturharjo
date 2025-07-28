import Image from "next/image";
import Navbar from "@/components/Navbar";
import Background from "@/components/Background";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Background />
      <Navbar />

      <section className="flex flex-1 flex-col md:flex-row gap-12 justify-center items-center p-10">
        {/* Text Content */}
        <div className="text-center md:text-left w-full max-w-md animate-fade-in">
          <p className="text-3xl md:text-5xl font-bold animate-slide-in-from-left">
            Selamat Datang di <span className="text-blue-400">UMKM</span> Caturharjo!
          </p>
          <p className="text-lg text-justify mt-4 animate-slide-in-from-left animate-delay-300">
            Temukan dan dukung produk-produk unggulan dari para pelaku Usaha Mikro, Kecil, dan Menengah di Kalurahan Caturharjo, Sleman.
          </p>
          <Button className="mt-4 text-xl h-14 animate-slide-in-from-left animate-delay-700 hover:scale-105 transition-all duration-300 hover:shadow-lg cursor-pointer">
            <Link href="/umkm">Telusuri UMKM</Link>
          </Button>
        </div>

        <div className="flex gap-x-5">
        {/* Video */}
          <div className=" animate-slide-in-from-right animate-delay-500 hover:scale-105 transition-transform duration-500">
            <div className="w-[160px] h-[300px] md:w-[300px] md:h-[545px] rounded-2xl overflow-hidden shadow-lg border-4 border-black">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="w-full h-full object-fill"
              >
                <source src="/profile.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Images */}
          <div className="flex flex-col gap-y-5">
            <Link
              href="https://www.google.com/maps/place/Caturharjo,+Sleman,+Sleman+Regency,+Special+Region+of+Yogyakarta"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="w-[150px] md:w-[280px]">
                <Image
                  src="/map.svg"
                  alt="Peta Caturharjo"
                  width={300}
                  height={300}
                  className="w-full h-full object-fill rounded-2xl overflow-hidden shadow-lg border-4 border-black animate-slide-in-from-right animate-delay-700 hover:scale-105 transition-transform duration-500"
                  priority
                />
                </div>
            </Link>
            <div className="w-[150px] md:w-[280px]">
              <Image
                src="/meeting.jpg"
                alt="Forkal UMKM"
                width={300}
                height={500}
                className="w-full h-full  object-fill rounded-2xl overflow-hidden shadow-lg border-4 border-black animate-slide-in-from-right animate-delay-700 hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
