'use client';

import { IconExclamationCircle, IconTrash } from '@tabler/icons-react';
import {
  MutationFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { Button } from '../ui/button';

type Props = {
  id: number | string;
  action: MutationFunction<unknown, number | string>;
  queryKeys?: string[];
};

const DeleteButton = ({ action, queryKeys, id }: Props) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: action,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: queryKeys });
    },
    onError: (error) => {
      console.error('Error deleting item:', error);
      alert(error instanceof Error ? error.message : 'Terjadi kesalahan');
    },
  });

  const confirmDeleteModal = () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      mutate(id);
    }
  };

  return (
    <Button size='icon' variant={'destructive'} onClick={confirmDeleteModal}>
      <IconTrash className='size-4' />
    </Button>
  );
};

export default DeleteButton;
