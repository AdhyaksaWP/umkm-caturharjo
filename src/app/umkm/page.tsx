import Image from "next/image";
import Navbar from "@/components/Navbar";
import Background from "@/components/Background";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function UMKMEntryPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Background/>
      <Navbar/>

      <section className="flex flex-col items-center justify-center flex-1 gap-10">
        <div className="flex flex-col gap-3 items-center justify-center animate-fade-in-down">
            <p className="text-4xl font-bold animate-bounce">Telusuri UMKM Caturharjo!</p>
            <div className="bg-black w-96 h-1 "></div>
        </div>

        <div className="flex flex-row gap-x-10 animate-fade-in-up animate-delay-700">
          <Link
            href="/umkm/Produk"
            className=" hover:scale-110 transition-all duration-300 hover:shadow-2xl"
          >
            <Image
              src="/Produk Section.svg"
              alt="Produk Button"
              width={200}
              height={200}
              className="hover:brightness-110 transition-all duration-300"
            />
          </Link>
          <Link
            href="/umkm/Kerajinan"
            className=" animate-delay-300 hover:scale-110 transition-all duration-300 hover:shadow-2xl"
          >
            <Image
                src="/Kerajinan Section.svg"
                alt="Kerajinan Button"
                width={200}
                height={200}
                className="hover:brightness-110 transition-all duration-300"
            />
          </Link>
          <Link
            href="/umkm/Jasa"
            className=" animate-delay-500 hover:scale-110 transition-all duration-300 hover:shadow-2xl"
          >
            <Image
                src="/Jasa Section.svg"
                alt="Jasa Button"
                width={200}
                height={200}
                className="hover:brightness-110 transition-all duration-300"
            />
          </Link>
        </div>
      </section>

      <Footer/>
    </main>
  );
}