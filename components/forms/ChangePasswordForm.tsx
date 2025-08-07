'use client';

import { changePasswordApi } from '@/api/users';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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

const changePasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z
      .string()
      .min(6, 'Confirm Password must be at least 6 characters long'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const ChangePasswordForm = () => {
  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: changePasswordApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('Password updated successfully');
      form.reset();
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : 'Change password failed'
      );
      console.error('Change password failed:', error);
      form.setError('newPassword', {
        message:
          error instanceof Error ? error.message : 'Change password failed',
      });
    },
  });

  const onSubmit = (data: z.infer<typeof changePasswordSchema>) => {
    mutate({
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='newPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm'>New Password</FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter your new password'
                  type='password'
                  className='text-sm'
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
                  placeholder='Confirm your new password'
                  type='password'
                  className='text-sm'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='mt-2' loading={isPending}>
          <span className='text-xs md:text-sm'>Change Password</span>
        </Button>
      </form>
    </Form>
  );
};
export default ChangePasswordForm;
