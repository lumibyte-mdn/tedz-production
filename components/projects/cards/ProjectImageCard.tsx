import { cn } from '@/lib/utils';
import { TProject } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  wrapperClassName?: string;
} & TProject;

const ProjectImageCard = ({ wrapperClassName, ...project }: Props) => {
  return (
    <Link
      href={`/projects/${project.id}`}
      className={cn('relative overflow-hidden group', wrapperClassName)}
    >
      <main className='relative'>
        <Image
          src={project.image}
          alt={project.title}
          width={1280}
          height={720}
          className='w-full max-h-[600px] object-cover'
        />

        <div
          className="absolute inset-0 before:absolute before:inset-0 before:bg-gradient-to-t before:from-black before:to-transparent before:content-[''] 
            group-hover:before:opacity-100 before:opacity-90 before:transition-opacity before:duration-300"
        ></div>

        <main className='mt-4 absolute bottom-6 left-0 right-0 p-4 text-center'>
          <h2 className='text-xl md:text-3xl font-bold text-white font-oswald'>
            {project.title}
          </h2>
          <p className='text-white text-base md:text-xl mt-2 line-clamp-2 font-oswald'>
            {project.description}
          </p>
        </main>
      </main>
    </Link>
  );
};
export default ProjectImageCard;
