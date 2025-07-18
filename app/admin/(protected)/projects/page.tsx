'use client';

import { deleteProjectApi, getProjectListApi } from '@/api/projects';
import PageTitle from '@/components/PageTitle';
import { DataTable } from '@/components/tables/DataTable';
import { Prisma } from '@/prisma/generated/prisma';
import { useQuery } from '@tanstack/react-query';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
// import CreateProjectForm from '@/components/forms/CreateProjectForm';
import DeleteButton from '@/components/buttons/DeleteButton';
// import EditProjectButton from '@/components/buttons/EditProjectButton';

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
            {/* <EditProjectButton data={info.row.original} /> */}

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

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const openCreateProjectModal = () => {
    setIsCreateModalOpen(true);
  };

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
          onAdd={openCreateProjectModal}
        />
      </section>

      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Project</DialogTitle>
          </DialogHeader>

          <main className='mt-4'>
            {/* <CreateProjectForm
              closeModal={() => setIsCreateModalOpen(false)}
            /> */}
          </main>
        </DialogContent>
      </Dialog>
    </main>
  );
};
export default ManageProjectPage;
