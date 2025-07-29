'use client';

import { deleteUserApi, getUserListApi } from '@/api/users';
import PageTitle from '@/components/PageTitle';
import { DataTable } from '@/components/tables/DataTable';
import { useQuery } from '@tanstack/react-query';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import CreateUserForm from '@/components/forms/CreateUserForm';
import DeleteButton from '@/components/buttons/DeleteButton';
import EditUserButton from '@/components/buttons/EditUserButton';
import { UserWithRole } from 'better-auth/plugins';

const ManageUserPage = () => {
  const helper = createColumnHelper<UserWithRole>();

  const columns = useMemo(
    () => [
      helper.accessor('id', {
        header: 'ID',
        meta: {
          width: 350,
        },
        cell: (info) => info.getValue(),
      }),
      helper.accessor('name', {
        header: 'Name',
        meta: {
          width: 350,
        },
        cell: (info) => info.getValue(),
      }),
      helper.accessor('email', {
        header: 'Email',
        cell: (info) => info.getValue(),
      }),
      helper.accessor('createdAt', {
        header: 'Joined At',
        cell: (info) => new Date(info.getValue() as Date).toLocaleDateString(),
      }),
      helper.display({
        id: 'actions',
        header: 'Actions',
        cell: (info) => (
          <div className='flex items-center gap-2'>
            <EditUserButton data={info.row.original} />

            <DeleteButton
              id={info.row.original.id}
              action={deleteUserApi}
              queryKeys={['users']}
            />
          </div>
        ),
      }),
    ],
    []
  );

  const { data, isPending } = useQuery<UserWithRole[]>({
    queryKey: ['users'],
    queryFn: () => getUserListApi(),
  });

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const openCreateUserModal = () => {
    setIsCreateModalOpen(true);
  };

  return (
    <main>
      <PageTitle
        title='Manage Users'
        subtitle='Create, edit, and delete users for your content.'
      />

      <section className='bg-white p-4 pt-0 rounded-lg shadow-md border border-border'>
        <DataTable
          columns={columns}
          data={data || []}
          loading={isPending}
          withAddButton
          onAdd={openCreateUserModal}
        />
      </section>

      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create User</DialogTitle>
          </DialogHeader>

          <main className='mt-4'>
            <CreateUserForm closeModal={() => setIsCreateModalOpen(false)} />
          </main>
        </DialogContent>
      </Dialog>
    </main>
  );
};
export default ManageUserPage;
