'use client';

import { getUserApi } from '@/api/auth';
import { updateProfileApi } from '@/api/users';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { toast } from 'sonner';

const profileSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.email().optional(),
});

const ChangeProfileForm = () => {
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getUserApi,
  });

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        email: user.email || '',
      });
    }
  }, [user]);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateProfileApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('Profile updated successfully');
    },
    onError: (error) => {
      console.error('Create profile failed:', error);
      toast.error(
        error instanceof Error ? error.message : 'Create profile failed'
      );
      form.setError('name', {
        message:
          error instanceof Error ? error.message : 'Create profile failed',
      });
    },
  });

  const onSubmit = (data: z.infer<typeof profileSchema>) => {
    mutate({
      name: data.name,
      email: data.email || '', // Ensure email is always a string
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm'>Name</FormLabel>
              <FormControl>
                <Input
                  className='text-sm'
                  placeholder='Enter your fullname'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm'>Email</FormLabel>
              <FormControl>
                <Input
                  className='text-sm'
                  placeholder='Enter your email'
                  type='email'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='mt-2' loading={isPending}>
          <span className='text-xs md:text-sm'>Save Changes</span>
        </Button>
      </form>
    </Form>
  );
};
export default ChangeProfileForm;
