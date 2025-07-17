import ProjectListSection from '@/components/sections/ProjectListSection';
import PageTitle from '@/components/titles/PageTitle';

const ProjectPage = () => {
  return (
    <>
      <PageTitle title='Projects' wrapperClassName='mt-20' />
      <ProjectListSection withCategoryTab />
    </>
  );
};
export default ProjectPage;
