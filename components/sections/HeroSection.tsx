import Image from 'next/image';

import PadelLogo from '@/public/svg/padellogo.svg';

const mockBrands = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  logo: PadelLogo, // Replace with actual brand logos as needed
})); // Mock data for brands, replace with actual brand logos if available

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
      <div className='mx-auto max-w-7xl relativem z-10 h-full px-6 lg:px-8'>
        <div className='relative z-10 h-full flex  top-0 bottom-0 left-0 right-0 items-center justify-start'>
          <div className='flex-col'>
            <h1 className='text-accent text-5xl lg:text-8xl font-bold font-oswald w-2/3 lg:w-1/2 leading-snug lg:leading-24'>
              YOUR DIGITAL BESTIE
            </h1>
            <p className='text-white w-2/3 lg:w-1/2 mt-8'>
              Tedz menjadi mitra terpercaya dalam solusi digital. Berbagai
              brand, baik lokal maupun internasional, dan telah membuktikan
              kualitas layanan yang kami berikan.
            </p>
            <button className='bg-secondary hover:bg-secondary-hover py-2 px-6 text-secondary-foreground rounded-md font-semibold  cursor-pointer mt-8'>
              Chat Tedz Sekarang
            </button>
          </div>
        </div>
      </div>

      {/* Brand */}
      <div className='absolute z-20 bottom-0 w-full'>
        <div className='overflow-hidden'>
          <div className='bg-secondary py-4'>
            <div className='animate-scroll flex justify-between gap-24'>
              {mockBrands.map((brand) => (
                <Image
                  src={brand.logo}
                  alt={`Brand Logo ${brand.id}`}
                  key={brand.id}
                  className='transition-all duration-300 grayscale hover:grayscale-0'
                  height={24}
                  width={100}
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
