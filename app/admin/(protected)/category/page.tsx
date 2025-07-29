'use client';

import { deleteCategoryApi, getCategoryListApi } from '@/api/category';
import PageTitle from '@/components/PageTitle';
import { DataTable } from '@/components/tables/DataTable';
import { Category } from '@/prisma/generated/prisma';
import { useQuery } from '@tanstack/react-query';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import CreateCategoryForm from '@/components/forms/CreateCategoryForm';
import DeleteButton from '@/components/buttons/DeleteButton';
import EditCategoryButton from '@/components/buttons/EditCategoryButton';

const ManageCategoryPage = () => {
  const helper = createColumnHelper<Category>();

  const columns = useMemo(
    () => [
      helper.accessor('id', {
        header: 'ID',
        cell: (info) => info.getValue(),
      }),
      helper.accessor('name', {
        header: 'Name',
        cell: (info) => info.getValue(),
      }),
      helper.accessor('layout', {
        header: 'Layout',
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
            <EditCategoryButton data={info.row.original} />

            <DeleteButton
              id={info.row.original.id}
              action={deleteCategoryApi}
              queryKeys={['categories']}
            />
          </div>
        ),
      }),
    ],
    []
  );

  const { data, isPending } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: getCategoryListApi,
  });

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const openCreateCategoryModal = () => {
    setIsCreateModalOpen(true);
  };

  return (
    <main>
      <PageTitle
        title='Manage Categories'
        subtitle='Create, edit, and delete categories for your content.'
      />

      <section className='bg-white p-4 pt-0 rounded-lg shadow-md border border-border'>
        <DataTable
          columns={columns}
          data={data || []}
          loading={isPending}
          withAddButton
          onAdd={openCreateCategoryModal}
        />
      </section>

      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Category</DialogTitle>
          </DialogHeader>

          <main className='mt-4'>
            <CreateCategoryForm
              closeModal={() => setIsCreateModalOpen(false)}
            />
          </main>
        </DialogContent>
      </Dialog>
    </main>
  );
};
export default ManageCategoryPage;
