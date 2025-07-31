'use client';

import Image from 'next/image';
import AllBrandImage from '@/public/images/brands.png';
import PizzaImage from '@/public/images/pizza.png';
import { useQuery } from '@tanstack/react-query';
import { getLatestProjectsApi } from '@/api/projects';
import { cn } from '@/lib/utils';

const ShowcaseSection = () => {
  const { data: latest } = useQuery({
    queryKey: ['latest'],
    queryFn: async () => await getLatestProjectsApi(),
  });

  if (!latest || latest.length === 0) {
    return null;
  }

  return (
    <section>
      <div>
        <div className='grid grid-cols-2'>
          {latest.map((project, i) => (
            <div
              key={project.id}
              className={cn(
                'relative mb-4',
                i % 2 === 0 ? 'col-span-full' : 'col-span-1'
              )}
            >
              <Image
                src={project.image || AllBrandImage}
                alt={project.title || 'Project Image'}
                width={500}
                height={300}
                className='w-full h-auto object-cover rounded-lg'
              />
              <div className='absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white'>
                <h3 className='text-lg font-bold'>{project.title}</h3>
                <p className='text-sm'>{project.subTitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default ShowcaseSection;
