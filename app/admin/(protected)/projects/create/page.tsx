import CreateProjectForm from '@/components/forms/CreateProjectForm';
import PageTitle from '@/components/PageTitle';

const CreateProjectPage = () => {
  return (
    <div>
      <PageTitle
        title='Create Project'
        subtitle='Create a new project for your content.'
      />
      <section className='bg-white p-4 rounded-lg shadow-md border border-border'>
        <CreateProjectForm />
      </section>
    </div>
  );
};
export default CreateProjectPage;
