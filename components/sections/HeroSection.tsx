import BrandListTape from '../BrandListTape';

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
            <h1 className='text-accent text-5xl md:text-7xl lg:text-8xl font-bold font-oswald w-full md:w-2/3 lg:w-1/2 leading-snug lg:leading-24 text-center md:text-left'>
              YOUR DIGITAL BESTIE
            </h1>
            <p className='text-white w-full md:w-2/3 lg:w-1/2 mt-8 text-center md:text-left'>
              Tedz Production helps brands craft out-of-the-box content with a
              skilled team to captivate audiences, boost engagement, and grow
              brand visibility because we know the formula.
            </p>
            <div className='flex justify-center md:justify-start mt-8'>
              <a href='https://api.whatsapp.com/send?phone=6285117305638'>
                <button className='bg-secondary hover:bg-secondary-hover py-2 px-6 text-secondary-foreground rounded-md font-semibold  cursor-pointer mt-8'>
                  Chat Tedz Sekarang
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Brand */}
      <BrandListTape />
    </section>
  );
};
export default HeroSection;
