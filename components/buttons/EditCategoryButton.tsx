'use client';

import { IconPencil } from '@tabler/icons-react';
import { Button } from '../ui/button';
import { Category } from '@/prisma/generated/prisma';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import EditCategoryForm from '../forms/EditCategoryForm';

type Props = {
  data: Category;
};

const EditCategoryButton = ({ data }: Props) => {
  const [open, setOpen] = useState(false);

  const handleEdit = () => {
    setOpen(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>

          <main className='mt-4'>
            <EditCategoryForm closeModal={() => setOpen(false)} data={data} />
          </main>
        </DialogContent>
      </Dialog>

      <Button variant='outline' size='icon' onClick={handleEdit}>
        <IconPencil className='size-4' />
      </Button>
    </>
  );
};

export default EditCategoryButton;
