'use client';

import { IconPencil } from '@tabler/icons-react';
import { Button } from '../ui/button';
import { Project } from '@/prisma/generated/prisma';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import EditProjectForm from '../forms/EditProjectForm';

type Props = {
  data: Project;
};

const EditProjectButton = ({ data }: Props) => {
  const [open, setOpen] = useState(false);

  const handleEdit = () => {
    setOpen(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
          </DialogHeader>

          <main className='mt-4'>
            <EditProjectForm
              closeModal={() => setOpen(false)}
              data={data}
              id={data.id}
            />
          </main>
        </DialogContent>
      </Dialog>

      <Button variant='outline' size='icon' onClick={handleEdit}>
        <IconPencil className='size-4' />
      </Button>
    </>
  );
};
export default EditProjectButton;
