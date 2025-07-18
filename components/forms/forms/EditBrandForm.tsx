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

import { createBrandApi, updateBrandApi } from '@/api/brands';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Brand } from '@/prisma/generated/prisma';

const brandSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters'),
  logo: z.instanceof(File).nullable().optional(),
});

type Props = {
  closeModal?: () => void;
  data?: Brand;
};

const EditBrandForm = ({ closeModal, data }: Props) => {
  const form = useForm<z.infer<typeof brandSchema>>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: '',
      logo: null as File | null,
    },
  });

  useEffect(() => {
    if (data) {
      form.setValue('name', data.name);
      form.setValue('logo', null);

      setPreviewImage(data.logo || null);
    }
  }, [data]);

  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateBrandApi,
    onSuccess: () => {
      router.push('/admin/brands');
      queryClient.invalidateQueries({ queryKey: ['brands'] });
      closeModal?.();
      form.reset();
    },
    onError: (error) => {
      console.error('Create brand failed:', error);
      form.setError('name', {
        message: error instanceof Error ? error.message : 'Create brand failed',
      });
    },
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    form.setValue('logo', file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  async function onSubmit(values: z.infer<typeof brandSchema>) {
    if (!data) {
      alert('No brand data provided for update');
      return;
    }

    // delete the logo file if it exists
    if (values.logo) {
      // remove the old logo file if it exists
      const oldLogoName = data.logo?.split('uploads/')[1];
      if (oldLogoName) {
        await fetch(`/api/upload?file=${oldLogoName}`, {
          method: 'DELETE',
        }).catch((err) => console.error('Failed to delete logo file:', err));
      }
    }

    const formData = new FormData();
    formData.append('file', values.logo as File);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    if (result.success) {
      mutate({ id: data?.id, data: { name: values.name, logo: result.name } });
    } else {
      alert('Upload failed');
    }
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
                <Input placeholder='Enter brand name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='logo'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logo</FormLabel>
              <FormControl>
                <Input
                  type='file'
                  accept='image/*'
                  onChange={(e) => {
                    handleFileChange(e);
                    field.onChange(e.target.files?.[0] || null);
                  }}
                />
              </FormControl>
              {previewImage && (
                <Image
                  src={previewImage}
                  alt='Preview'
                  width={100}
                  height={100}
                  loading='lazy'
                  className='mt-2 w-24 h-24 object-contain rounded'
                />
              )}
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
export default EditBrandForm;
