import { TProject } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

type Props = {} & TProject;

const ProjectPotraitCard = ({ ...project }: Props) => {
  return (
    <Link
      href={`/projects/${project.id}`}
      className='relative overflow-hidden group'
    >
      <main>
        <Image
          src={project.image}
          alt={project.title}
          width={1080}
          height={1920}
          className='w-full h-[360px] object-cover hover:brightness-75 transition-all duration-300'
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
export default ProjectPotraitCard;
