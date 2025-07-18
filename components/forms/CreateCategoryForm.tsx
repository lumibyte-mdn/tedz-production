'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { CategoryLayout } from '@/prisma/generated/prisma';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createCategoryApi } from '@/api/category';

const categorySchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters'),
  layout: z.enum(CategoryLayout),
});

type Props = {
  closeModal?: () => void;
};

const CreateCategoryForm = ({ closeModal }: Props) => {
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      layout: CategoryLayout.CARD,
    },
  });

  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createCategoryApi,
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

  function onSubmit(values: z.infer<typeof categorySchema>) {
    mutate(values);
  }

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
export default CreateCategoryForm;
