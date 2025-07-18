'use client';

import { deleteBrandApi, getBrandListApi } from '@/api/brands';
import PageTitle from '@/components/PageTitle';
import { DataTable } from '@/components/tables/DataTable';
import { Brand } from '@/prisma/generated/prisma';
import { useQuery } from '@tanstack/react-query';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import CreateBrandForm from '@/components/forms/CreateBrandForm';
import DeleteButton from '@/components/buttons/DeleteButton';
// import EditBrandButton from '@/components/buttons/EditBrandButton';
import Image from 'next/image';
import EditBrandButton from '@/components/buttons/EditBrandButton';

const ManageBrandPage = () => {
  const helper = createColumnHelper<Brand>();

  const columns = useMemo(
    () => [
      helper.accessor('id', {
        header: 'ID',
        meta: {
          width: 80,
        },
        cell: (info) => info.getValue(),
      }),
      helper.accessor('logo', {
        header: 'Logo',
        cell: (info) => (
          <Image
            src={info.getValue() || 'https://placehold.co/400x400'}
            alt='Brand Logo'
            width={100}
            height={100}
            className='rounded object-contain size-16'
          />
        ),
      }),
      helper.accessor('name', {
        header: 'Name',
        cell: (info) => info.getValue(),
      }),
      helper.display({
        id: 'actions',
        header: 'Actions',
        cell: (info) => (
          <div className='flex items-center gap-2'>
            <EditBrandButton data={info.row.original} />

            <DeleteButton
              id={info.row.original.id}
              action={deleteBrandApi}
              queryKeys={['brands']}
            />
          </div>
        ),
      }),
    ],
    []
  );

  const { data, isPending } = useQuery<Brand[]>({
    queryKey: ['brands'],
    queryFn: getBrandListApi,
  });

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const openCreateBrandModal = () => {
    setIsCreateModalOpen(true);
  };

  return (
    <main>
      <PageTitle
        title='Manage Brands'
        subtitle='Create, edit, and delete brands for your content.'
      />

      <section className='bg-white p-4 pt-0 rounded-lg shadow-md border border-border'>
        <DataTable
          columns={columns}
          data={data || []}
          loading={isPending}
          withAddButton
          onAdd={openCreateBrandModal}
        />
      </section>

      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Brand</DialogTitle>
          </DialogHeader>

          <main className='mt-4'>
            <CreateBrandForm closeModal={() => setIsCreateModalOpen(false)} />
          </main>
        </DialogContent>
      </Dialog>
    </main>
  );
};
export default ManageBrandPage;
