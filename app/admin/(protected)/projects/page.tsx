'use client';

import { deleteProjectApi, getProjectListApi } from '@/api/projects';
import PageTitle from '@/components/PageTitle';
import { DataTable } from '@/components/tables/DataTable';
import { Prisma } from '@/prisma/generated/prisma';
import { useQuery } from '@tanstack/react-query';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';

// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog';
// import CreateProjectForm from '@/components/forms/CreateProjectForm';
import DeleteButton from '@/components/buttons/DeleteButton';
import Image from 'next/image';
import EditProjectButton from '@/components/buttons/EditProjectButton';
import { useRouter } from 'next/navigation';

const ManageProjectPage = () => {
  const helper =
    createColumnHelper<
      Prisma.ProjectGetPayload<{ include: { category: true } }>
    >();

  const columns = useMemo(
    () => [
      helper.accessor('id', {
        header: 'ID',
        cell: (info) => info.getValue(),
      }),
      helper.accessor('image', {
        header: 'Image',
        cell: (info) => (
          <Image
            src={info.getValue() || 'https://placehold.co/400x400'}
            alt='Brand Image'
            width={100}
            height={100}
            className='rounded object-contain size-16'
          />
        ),
      }),
      helper.accessor('title', {
        header: 'Title',
        cell: (info) => info.getValue(),
      }),
      helper.accessor('description', {
        header: 'Description',
        cell: (info) => info.getValue(),
      }),
      helper.accessor('category.name', {
        header: 'Category',
        cell: (info) => info.getValue(),
      }),
      helper.accessor('createdAt', {
        header: 'Created At',
        cell: (info) => new Date(info.getValue() as Date).toLocaleDateString(),
      }),
      helper.display({
        id: 'actions',
        header: 'Actions',
        cell: (info) => (
          <div className='flex items-center gap-2'>
            <EditProjectButton data={info.row.original} />

            <DeleteButton
              id={info.row.original.id}
              action={deleteProjectApi}
              queryKeys={['projects']}
            />
          </div>
        ),
      }),
    ],
    []
  );

  const { data, isPending } = useQuery<
    Prisma.ProjectGetPayload<{ include: { category: true } }>[]
  >({
    queryKey: ['projects'],
    queryFn: () => getProjectListApi(),
  });

  const router = useRouter();

  // const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // const openCreateProjectModal = () => {
  //   setIsCreateModalOpen(true);
  // };

  return (
    <main>
      <PageTitle
        title='Manage Projects'
        subtitle='Create, edit, and delete projects for your content.'
      />

      <section className='bg-white p-4 pt-0 rounded-lg shadow-md border border-border'>
        <DataTable
          columns={columns}
          data={data || []}
          loading={isPending}
          withAddButton
          onAdd={() => router.push('/admin/projects/create')}
        />
      </section>

      {/* <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Project</DialogTitle>
          </DialogHeader>

          <main className='mt-4'>
            <CreateProjectForm closeModal={() => setIsCreateModalOpen(false)} />
          </main>
        </DialogContent>
      </Dialog> */}
    </main>
  );
};
export default ManageProjectPage;
