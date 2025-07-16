import { BRANDS } from '@/lib/brand';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className='relative w-full h-screen overflow-hidden'>
      <video
        className='absolute top-0 left-0 w-full h-full object-cover'
        autoPlay
        loop
        muted
        playsInline
      >
        <source src='/video/tedz.mp4' type='video/mp4' />
        Your browser does not support the video tag.
      </video>

      <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/90 to-transparent z-0' />

      {/* Konten di atas video */}
      <div className='mx-auto max-w-7xl relativem z-10 h-full'>
        <div className='relative z-10 h-full flex  top-0 bottom-0 left-0 right-0 items-center justify-start'>
          <div className='flex-col'>
            <h1 className='text-accent text-8xl font-bold font-oswald w-1/2 leading-24'>
              YOUR DIGITAL BESTIE
            </h1>
            <p className='text-white w-1/2 text-base mt-8'>
              Tedz menjadi mitra terpercaya dalam solusi digital. Berbagai
              brand, baik lokal maupun internasional, dan telah membuktikan
              kualitas layanan yang kami berikan.
            </p>
            <button className='bg-[#065dc6] hover:bg-[#065cc6bf] py-2 px-6 text-white rounded-md font-semibold text-base cursor-pointer mt-8'>
              Chat Tedz Sekarang
            </button>
          </div>
        </div>
      </div>

      {/* Brand */}
      <div className='absolute z-20 bottom-0 w-full'>
        <div className='overflow-hidden'>
          <div className='bg-[#065DC6] py-4'>
            <div className='animate-scroll flex justify-between gap-24'>
              {BRANDS.map((brand) => (
                <Image
                  src={brand.logo}
                  alt=''
                  key={brand.id}
                  className='transition-all duration-300 grayscale hover:grayscale-0'
                  height={24}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
