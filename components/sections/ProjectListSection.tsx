'use client';

import { useState } from 'react';
import Section from './Section';
import { cn } from '@/lib/utils';
import { TProject } from '@/types';
import ProjectCard from '../projects/cards/ProjectCard';
import ProjectPotraitCard from '../projects/cards/ProjectPotraitCard';
import ProjectImageCard from '../projects/cards/ProjectImageCard';
import Container from '../wrappers/Container';

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

const mockCategories = [
  { id: 1, name: 'VIDEO COMMERCIAL' },
  { id: 2, name: 'SOCIAL MEDIA' },
  { id: 3, name: 'TIKTOK / REELS' },
];

type Props = {
  withCategoryTab?: boolean;
};

const ProjectListSection = ({ withCategoryTab }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState(
    mockCategories[0].id
  );

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategory(categoryId);
    // Logic to filter projects by category can be added here
  };

  return (
    <Section className='py-0'>
      <Container>
        {withCategoryTab && (
          <header className='mb-20 flex items-center flex-wrap md:flex-nowrap justify-around gap-6'>
            {mockCategories.map((category) => (
              <button
                key={category.id}
                className={cn(
                  'text-lg md:text-2xl font-bold transition-colors uppercase',
                  selectedCategory === category.id
                    ? 'text-accent hover:text-accent-hover'
                    : 'text-white hover:text-gray-300'
                )}
                onClick={() => handleCategoryChange(category.id)}
              >
                {category.name}
              </button>
            ))}
          </header>
        )}

        {selectedCategory == 2 && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-14'>
            {mockProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        )}

        {selectedCategory == 3 && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-14'>
            {mockProjects.map((project) => (
              <ProjectPotraitCard key={project.id} {...project} />
            ))}
          </div>
        )}
      </Container>

      {selectedCategory == 1 && (
        <div className='grid grid-cols-1 md:grid-cols-2'>
          {mockProjects.map((project) => (
            <ProjectImageCard
              key={project.id}
              wrapperClassName='odd:col-span-2'
              {...project}
            />
          ))}
        </div>
      )}
    </Section>
  );
};
export default ProjectListSection;
