import Link from 'next/link';
import { FreeMode, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProjectPotraitCard from '../projects/ProjectPotraitCard';
import { TProject } from '@/types';

const mockProjects: TProject[] = [
  {
    id: 1,
    title: 'Urban Exploration',
    image:
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    category: 'Documentary',
    description: 'Exploring the hidden corners of the city at night.',
  },
  {
    id: 2,
    title: 'Nature Wonders',
    image:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    video: 'https://www.w3schools.com/html/movie.mp4',
    category: 'Nature',
    description: 'A journey through the most beautiful forests.',
  },
  {
    id: 3,
    title: 'Culinary Journey',
    image:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    category: 'Lifestyle',
    description: 'Discovering unique dishes from around the world.',
  },
  {
    id: 4,
    title: 'Tech Innovations',
    image:
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
    video: 'https://www.w3schools.com/html/movie.mp4',
    category: 'Technology',
    description: 'Latest trends and innovations in technology.',
  },
  {
    id: 5,
    title: 'Wildlife Safari',
    image:
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    category: 'Adventure',
    description: 'An up-close look at wildlife in their natural habitat.',
  },
  {
    id: 6,
    title: 'Street Art',
    image:
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80',
    video: 'https://www.w3schools.com/html/movie.mp4',
    category: 'Art',
    description: 'Exploring vibrant street art from different cities.',
  },
  {
    id: 7,
    title: 'Mountain Hiking',
    image:
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    category: 'Travel',
    description: 'Challenging hikes and breathtaking mountain views.',
  },
  {
    id: 8,
    title: 'Underwater World',
    image:
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    video: 'https://www.w3schools.com/html/movie.mp4',
    category: 'Nature',
    description: 'Discover the beauty of marine life.',
  },
  {
    id: 9,
    title: 'Classic Cars',
    image:
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    category: 'Automotive',
    description: 'A showcase of timeless classic cars.',
  },
  {
    id: 10,
    title: 'Festival Vibes',
    image:
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    video: 'https://www.w3schools.com/html/movie.mp4',
    category: 'Event',
    description: 'Capturing the energy of music festivals.',
  },
];
const ProjectSection = () => {
  return (
    <section>
      <div className='max-w-7xl mx-auto my-20'>
        <header className='text-white flex justify-between'>
          <h1 className='font-oswald text-2xl lg:text-7xl'>OUR PROJECT</h1>
          <Link
            href='/projects'
            className='border-accent lg:py-4 lg:px-6 rounded-lg border-2 flex-center h-fit font-bold hover:bg-accent hover:text-black transition-all duration-300 py-2 px-4 text-sm lg:text-base'
          >
            Lihat Semua
          </Link>
        </header>

        <main className='my-10'>
          <Swiper
            modules={[FreeMode, Pagination]}
            spaceBetween={30}
            slidesPerView={4}
            height={650}
            pagination={{
              bulletActiveClass: '!bg-accent/100 !opacity-100',
              bulletClass: 'swiper-pagination-bullet !bg-accent !size-2.5',
            }}
            className='h-[650px]'
          >
            {mockProjects.map((project) => (
              <SwiperSlide key={project.id}>
                <ProjectPotraitCard {...project} />
              </SwiperSlide>
            ))}
          </Swiper>
        </main>
      </div>
    </section>
  );
};
export default ProjectSection;
