'use client';

import { IconPencil } from '@tabler/icons-react';
import { Button } from '../ui/button';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import EditUserForm from '../forms/forms/EditUserForm';
import { UserWithRole } from 'better-auth/plugins';

type Props = {
  data: UserWithRole;
};

const EditUserButton = ({ data }: Props) => {
  const [open, setOpen] = useState(false);

  const handleEdit = () => {
    setOpen(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>

          <main className='mt-4'>
            <EditUserForm closeModal={() => setOpen(false)} data={data} />
          </main>
        </DialogContent>
      </Dialog>

      <Button variant='outline' size='icon' onClick={handleEdit}>
        <IconPencil className='size-4' />
      </Button>
    </>
  );
};
export default EditUserButton;
