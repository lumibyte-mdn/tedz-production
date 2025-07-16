import { TService } from '@/types';
import Link from 'next/link';

const services: TService[] = [
  {
    title: 'Video Commercials',
    slug: 'video-commercials',
    image: '/images/services.png',
  },
  {
    title: 'Photography',
    slug: 'photography',
    image: '/images/services.png',
  },
  {
    title: 'Event Coverage',
    slug: 'event-coverage',
    image: '/images/services.png',
  },
];

const ServiceSection = () => {
  return (
    <section className='max-w-7xl mx-auto py-32'>
      <h1 className='text-4xl text-accent text-center mb-20'>OUR SERVICES</h1>

      <div className='grid grid-cols-3'>
        {services.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className='relative overflow-hidden group'
          >
            <div className="bg-[url('/images/services.png')] bg-cover w-[375px] h-[400px] rounded-lg">
              <div
                className="absolute inset-0 before:absolute before:inset-0 before:bg-gradient-to-t before:from-black before:to-transparent before:content-[''] 
            group-hover:before:opacity-50 before:transition-opacity before:duration-300"
              ></div>
              <div className='relative h-full flex flex-col items-center justify-end pb-5 w-full'>
                <div className='max-w-[100px] mx-auto flex-center'>
                  <p className='font-black text-center text-white text-lg lg:text-3xl'>
                    {service.title}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
export default ServiceSection;
