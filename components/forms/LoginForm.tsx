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
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
  email: z.email().max(100),
  password: z.string().min(6).max(100),
});

async function postLoginApi(email: string, password: string) {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    throw new Error('Login failed');
  }
  return response.json();
}

const LoginForm = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: (postData: z.infer<typeof loginSchema>) =>
      postLoginApi(postData.email, postData.password),
    onSuccess: (user) => {
      console.log('🚀 ~ LoginForm ~ user:', user);
      router.push('/admin');
    },
    onError: (error) => {
      console.error('Login failed:', error);
      form.setError('email', {
        message: 'Email or password is incorrect',
      });
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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
          Login
        </Button>
      </form>
    </Form>
  );
};
export default LoginForm;
