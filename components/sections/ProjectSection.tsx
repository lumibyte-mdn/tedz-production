'use client';

import Link from 'next/link';
import { FreeMode, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProjectPotraitCard from '../projects/cards/ProjectPotraitCard';
import { getProjectListApi } from '@/api/projects';
import { useQuery } from '@tanstack/react-query';
import { Project } from '@/prisma/generated/prisma';

const ProjectSection = () => {
  const { data: projects } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => await getProjectListApi(),
  });

  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section>
      <div className='max-w-7xl mx-auto my-20 px-6'>
        <header className='text-white flex justify-between items-center'>
          <h1 className='font-oswald text-2xl lg:text-5xl font-semibold'>
            OUR PROJECT
          </h1>
          <Link
            href='/projects'
            className='border-secondary lg:py-2 lg:px-4 rounded-lg border-2 flex-center h-fit font-bold hover:bg-secondary transition-all duration-300 py-2 px-4 text-sm text-white'
          >
            Lihat Semua
          </Link>
        </header>

        <main className='my-10'>
          <Swiper
            modules={[FreeMode, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 5,
              },
            }}
            pagination={{
              bulletActiveClass: '!bg-accent/100 !opacity-100',
              bulletClass: 'swiper-pagination-bullet !bg-accent !size-2.5',
              clickable: true,
            }}
            className='h-[540px]'
          >
            {projects?.map((project) => (
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
