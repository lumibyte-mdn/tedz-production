'use client';

import { useEffect, useState } from 'react';
import Section from './Section';
import { cn } from '@/lib/utils';
import ProjectCard from '../projects/cards/ProjectCard';
import ProjectPotraitCard from '../projects/cards/ProjectPotraitCard';
import ProjectImageCard from '../projects/cards/ProjectImageCard';
import Container from '../wrappers/Container';
import { useQuery } from '@tanstack/react-query';
import { getCategoryListApi } from '@/api/category';
import { getProjectListApi } from '@/api/projects';
import { CategoryLayout } from '@/prisma/generated/prisma';

type Props = {
  withCategoryTab?: boolean;
};

const ProjectListSection = ({ withCategoryTab }: Props) => {
  const { data: categories, isPending: isCategoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategoryListApi,
    enabled: withCategoryTab,
  });

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedLayout, setSelectedLayout] = useState<CategoryLayout>(
    CategoryLayout.GRID
  );

  useEffect(() => {
    if (categories && categories.length > 0) {
      setSelectedCategory(categories[0].id);
      setSelectedLayout(CategoryLayout.GRID);
    }
  }, [categories]);

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategory(categoryId);
    // Logic to filter projects by category can be added here

    const category = categories?.find((cat) => cat.id === categoryId);
    if (category) {
      setSelectedLayout(category.layout || CategoryLayout.CARD);
    }
  };

  const { data: projects, isPending: isProjectsLoading } = useQuery({
    queryKey: ['projects', { categoryId: selectedCategory }],
    queryFn: () => getProjectListApi({ categoryId: selectedCategory }),
    enabled: !!selectedCategory,
  });

  return (
    <Section className='py-0 min-h-[600px]'>
      <Container className='pb-0'>
        {withCategoryTab && (
          <header className='mb-20 flex items-center flex-wrap md:flex-nowrap justify-around gap-6'>
            {isCategoriesLoading ? (
              <div className='text-white text-lg md:text-2xl font-bold'>
                Loading categories...
              </div>
            ) : categories?.length === 0 ? (
              <div className='text-white text-lg md:text-2xl font-bold text-center min-h-56'>
                No projects found
              </div>
            ) : (
              categories?.map((category) => (
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
              ))
            )}
          </header>
        )}

        {selectedLayout === CategoryLayout.CARD && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-14'>
            {isProjectsLoading ? (
              <div className='text-white text-lg md:text-2xl font-bold text-center min-h-56 col-span-full'>
                Loading projects...
              </div>
            ) : !projects?.length ? (
              <div className='text-white text-lg md:text-2xl font-bold text-center min-h-56 col-span-full'>
                No projects found
              </div>
            ) : (
              projects?.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))
            )}
          </div>
        )}

        {selectedLayout === CategoryLayout.PORTRAIT && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-14'>
            {isProjectsLoading ? (
              <div className='text-white text-lg md:text-2xl font-bold text-center min-h-56 col-span-full'>
                Loading projects...
              </div>
            ) : !projects?.length ? (
              <div className='text-white text-lg md:text-2xl font-bold text-center min-h-56 col-span-full'>
                No projects found
              </div>
            ) : (
              projects?.map((project) => (
                <ProjectPotraitCard key={project.id} {...project} />
              ))
            )}
          </div>
        )}
      </Container>

      {selectedLayout === CategoryLayout.GRID && (
        <div className='grid grid-cols-1 md:grid-cols-2'>
          {isProjectsLoading ? (
            <div className='text-white text-lg md:text-2xl font-bold text-center min-h-56 col-span-full'>
              Loading projects...
            </div>
          ) : !projects?.length ? (
            <div className='text-white text-lg md:text-2xl font-bold text-center min-h-56 col-span-full'>
              No projects found
            </div>
          ) : (
            projects.map((project) => (
              <ProjectImageCard
                key={project.id}
                wrapperClassName='odd:col-span-2'
                {...project}
              />
            ))
          )}
        </div>
      )}
    </Section>
  );
};
export default ProjectListSection;
