'use client';

import Background from '@/components/Background';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Input } from '@/components/ui/input';
import UmkmPreview from '@/components/UmkmPreview';
import { UmkmPagination } from '@/components/UmkmPagination';
import { useState, useEffect, useMemo, use } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Popups from '@/components/Popups';
import Image from 'next/image'

type Props = {
  params: Promise<{
    category: string;
  }>;
};

type UMKM = {
  _id: string;
  Nama: string;
  Tipe: string;
  Alamat: string;
  Keterangan: string;
  Gambar: string;
};

const UMKMListPage = ({ params }: Props) => {
  const [umkm, setUmkm] = useState<UMKM[]>([]);
  const [selectedUmkm, setSelectedUmkm] = useState<UMKM | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [umkmSearch, setUmkmSearch] = useState<string>("");
  
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const page = searchParams.get('page') ?? '1';
  const per_page = searchParams.get('per_page') ?? '6';
  const searchQuery = searchParams.get('search') ?? '';

  const { category } = use(params);

  // Initialize search input from URL params
  useEffect(() => {
    setUmkmSearch(searchQuery);
  }, [searchQuery]);

  // Update URL when search changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    
    if (umkmSearch) {
      params.set('search', umkmSearch);
      params.set('page', '1'); // Reset to first page when searching
    } else {
      params.delete('search');
    }
    
    router.replace(`${pathname}?${params.toString()}`);
  }, [umkmSearch, pathname, router, searchParams]);

  useEffect(() => {
    if (!category) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/umkm?limit=${per_page}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            Tipe: category,
            Page: Number(page),
            search: umkmSearch || undefined
          })
        });

        const jsonData = await res.json();
        setUmkm(jsonData.data || []);
      } catch (error) {
        console.error('Error fetching UMKM data:', error);
        setUmkm([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [category, page, per_page, umkmSearch]);

  const handleUmkmClick = (umkmData: UMKM) => {
    setSelectedUmkm(umkmData);
  };

  const handleClosePopup = () => {
    setSelectedUmkm(null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUmkmSearch(e.target.value);
  };

  const handleClearSearch = () => {
    setUmkmSearch("");
    const params = new URLSearchParams(searchParams);
    params.delete('search');
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Background/>
      <Navbar/>
      
      <section className={`flex-1 flex justify-center flex-col p-5 md:px-55 gap-5`}>
        <h1 className="text-3xl">Daftar <span className='font-bold'>{category}</span></h1>
        <div className='flex justify-end items-center gap-2'>
          <div className="relative">
            <Input
              className='w-64 h-8 bg-white pr-8'
              placeholder='Search UMKM...'
              value={umkmSearch}
              onChange={handleSearchChange}
            />
            {umkmSearch && (
              <button
                onClick={handleClearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            )}
          </div>
        </div>

        <div className='flex items-center justify-center'>
          {isLoading ? (
            <div className="text-center">Loading...</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-10">
                {umkm && umkm.length > 0 ? (
                  umkm.map((data) => (
                    <UmkmPreview
                      key={data._id}
                      params={{
                        id: data._id,
                        Nama: data.Nama,
                        Tipe: data.Tipe,
                        Alamat: data.Alamat,
                        Keterangan: data.Keterangan,
                        Gambar: data.Gambar
                      }}
                      onClick={() => handleUmkmClick(data)}
                    />
                  ))
                ) : (
                  <div className="text-center text-gray-500">
                    {umkmSearch ? `No UMKM found for "${umkmSearch}"` : 'No UMKM data found'}
                  </div>
                )}
              </div>
            )}
        </div>
        <UmkmPagination params={{url: `${category}`}}></UmkmPagination>

      </section>

      {selectedUmkm && (
        <Popups 
          params={{
            Title: selectedUmkm.Nama,
            Width: "max-w-screen-sm",
            Height: "max-h-[80vh]",
          }}
          onClose={handleClosePopup}
        >
          <div className='flex flex-col justify-center items-center'>
          { selectedUmkm.Gambar == "" ? (
              <Image
                src="/shop placeholder.jpg"
                alt='shop placeholder image'
                width={300}
                height={300}
                className="!w-[320px] !h-[240px] object-fill pb-5"
              />
            ): (
              <Image
                src={selectedUmkm.Gambar}
                alt='umkm image'
                width={300}
                height={300}
                className="!w-[500px] !h-[200px] object-fill pb-5"
              />
            )}
            <p className='mb-3 text-justify'>{selectedUmkm.Keterangan}</p>
            <p className='text-gray-600'>Alamat: {selectedUmkm.Alamat}</p>
          </div>
        </Popups>
      )}

      <Footer/>   
    </main>
  );
};

export default UMKMListPage;