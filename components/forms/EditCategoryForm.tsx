'use client';

import { updateCategoryApi } from '@/api/category';
import { Category, CategoryLayout } from '@/prisma/generated/prisma';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useEffect } from 'react';

const categorySchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters'),
  layout: z.enum(CategoryLayout),
});

type Props = {
  closeModal: () => void;
  data?: Category; // Adjust type as necessary
};

const EditCategoryForm = ({ closeModal, data }: Props) => {
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: data?.name || '',
      layout: data?.layout || CategoryLayout.CARD,
    },
  });

  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateCategoryApi,
    onSuccess: () => {
      router.push('/admin/category');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      closeModal?.();
      form.reset();
    },
    onError: (error) => {
      console.error('Create category failed:', error);
      form.setError('name', {
        message:
          error instanceof Error ? error.message : 'Create category failed',
      });
    },
  });

  const onSubmit = (values: z.infer<typeof categorySchema>) => {
    if (!data) return alert('No category data provided');
    mutate({ id: data.id, data: values });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Enter category name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='layout'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Layout</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Layout' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={CategoryLayout.CARD}>Card</SelectItem>
                    <SelectItem value={CategoryLayout.PORTRAIT}>
                      Portrait
                    </SelectItem>
                    <SelectItem value={CategoryLayout.GRID}>Grid</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='mt-2' loading={isPending}>
          Save
        </Button>
      </form>
    </Form>
  );
};
export default EditCategoryForm;
