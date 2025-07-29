'use client';

import { generateAdminApi } from '@/api/auth';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import z from 'zod';

const generateAdminSchema = z.object({
  fullName: z.string().min(1, 'Full name is required').max(100),
  email: z.email().max(100),
  password: z.string().min(6).max(100),
});

const GenerateAdminForm = () => {
  const form = useForm<z.infer<typeof generateAdminSchema>>({
    resolver: zodResolver(generateAdminSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  });

  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: generateAdminApi,
    onSuccess: () => {
      router.refresh();
    },
    onError: (error) => {
      console.error('Login failed:', error);
      form.setError('email', {
        message: error instanceof Error ? error.message : 'Login failed',
      });
    },
  });

  function onSubmit(values: z.infer<typeof generateAdminSchema>) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='fullName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder='Enter your full name' {...field} />
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
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder='Enter your email address' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <Button type='submit' className='w-full mt-2' loading={isPending}>
          Create Admin
        </Button>
      </form>
    </Form>
  );
};
export default GenerateAdminForm;
