import { Project } from '@/prisma/generated/prisma';
import Image from 'next/image';
import Link from 'next/link';

type Props = {} & Project;

const ProjectCard = ({ ...project }: Props) => {
  return (
    <Link
      href={`/projects/${project.id}`}
      className='relative overflow-hidden group'
    >
      <main>
        <Image
          src={project.image || 'https://placehold.co/600x400'}
          alt={project.title}
          width={1080}
          height={1080}
          className='size-[400px] object-cover hover:brightness-75 transition-all duration-300'
        />

        <main className='mt-4'>
          <h2 className='text-2xl font-bold text-white'>{project.title}</h2>
          <p className='text-gray-300 text-sm mt-2 line-clamp-2'>
            {project.description}
          </p>
        </main>
      </main>
    </Link>
  );
};
export default ProjectCard;
