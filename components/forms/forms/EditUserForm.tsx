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

import { updateUserApi } from '@/api/users';
import { UserWithRole } from 'better-auth/plugins';

const userSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .max(100, 'Name must be less than 100 characters'),
    email: z
      .email('Invalid email address')
      .min(1, 'Email is required')
      .max(100, 'Email must be less than 100 characters')
      .optional(),
    password: z
      .string()
      .max(100, 'Password must be less than 100 characters')
      .optional(),
    confirmPassword: z
      .string()
      .max(100, 'Confirm Password must be less than 100 characters')
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type Props = {
  closeModal?: () => void;
  data?: UserWithRole;
};

const EditUserForm = ({ closeModal, data }: Props) => {
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: data?.name || '',
      email: data?.email || '',
      password: '',
      confirmPassword: '',
    },
  });

  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: () => {
      router.push('/admin/users');
      queryClient.invalidateQueries({ queryKey: ['users'] });
      closeModal?.();
      form.reset();
    },
    onError: (error) => {
      console.error('Create user failed:', error);
      form.setError('name', {
        message: error instanceof Error ? error.message : 'Create user failed',
      });
    },
  });

  async function onSubmit(values: z.infer<typeof userSchema>) {
    if (!data) {
      alert('No user data provided for update');
      return;
    }

    let payload: {
      fullName: string;
      password?: string;
    } = {
      fullName: values.name,
    };

    if (values.password) {
      payload = {
        ...payload,
        password: values.password,
      };
    }

    mutate({
      id: data?.id,
      data: payload,
    });
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
                <Input placeholder='Enter user name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          disabled
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder='Enter user email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Enter your password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Confirm your password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type='submit' className='mt-2' loading={isPending}>
          Save
        </Button>
      </form>
    </Form>
  );
};
export default EditUserForm;
