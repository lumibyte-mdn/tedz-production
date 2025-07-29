'use client';

import { IconPencil } from '@tabler/icons-react';
import { Button } from '../ui/button';
import { Brand } from '@/prisma/generated/prisma';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import EditBrandForm from '../forms/forms/EditBrandForm';

type Props = {
  data: Brand;
};

const EditBrandButton = ({ data }: Props) => {
  const [open, setOpen] = useState(false);

  const handleEdit = () => {
    setOpen(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Brand</DialogTitle>
          </DialogHeader>

          <main className='mt-4'>
            <EditBrandForm closeModal={() => setOpen(false)} data={data} />
          </main>
        </DialogContent>
      </Dialog>

      <Button variant='outline' size='icon' onClick={handleEdit}>
        <IconPencil className='size-4' />
      </Button>
    </>
  );
};
export default EditBrandButton;
