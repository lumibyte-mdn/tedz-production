import { getProjectDetailApi } from '@/api/projects';
import EditProjectForm from '@/components/forms/EditProjectForm';
import PageTitle from '@/components/PageTitle';
import { getQueryClient } from '@/lib/query';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

const EditProjectPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const param = await params;
  const id = parseInt(param.id);

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['project', { id }],
    queryFn: () => getProjectDetailApi(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <PageTitle
          title='Edit Project'
          subtitle='Edit a project for your content.'
        />
        <section className='bg-white p-4 rounded-lg shadow-md border border-border'>
          <EditProjectForm id={id} />
        </section>
      </div>
    </HydrationBoundary>
  );
};
export default EditProjectPage;
