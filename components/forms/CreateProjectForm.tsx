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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { createProjectApi } from '@/api/projects';
import { useState } from 'react';
import Image from 'next/image';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { getCategoryListApi } from '@/api/category';

const projectSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title must be less than 100 characters'),
  image: z.instanceof(File).nullable().optional(),
  video: z.instanceof(File).nullable().optional(),
  description: z.string().min(1, 'Description is required'),
  categoryId: z.string().min(1, 'Category is required'),
});

type Props = {
  closeModal?: () => void;
};

const CreateProjectForm = ({ closeModal }: Props) => {
  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
      image: null as File | null,
      video: null as File | null,
      description: '',
      categoryId: '',
    },
  });

  const { data: categories, isPending: isCategoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategoryListApi(),
  });

  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createProjectApi,
    onSuccess: () => {
      router.push('/admin/projects');
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      closeModal?.();
      form.reset();
    },
    onError: (error) => {
      console.error('Create project failed:', error);
      form.setError('title', {
        message:
          error instanceof Error ? error.message : 'Create project failed',
      });
    },
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleFileImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] || null;
    form.setValue('image', file);
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

  async function onSubmit(values: z.infer<typeof projectSchema>) {
    const formData = new FormData();
    formData.append('file', values.image as File);

    const uploadImage = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await uploadImage.json();
    if (result.success) {
      mutate({
        title: values.title,
        image: result.name,
        description: values.description,
        video: null,
        category: {
          connect: {
            id: parseInt(values.categoryId),
          },
        },
      });
    } else {
      alert('Upload failed');
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder='Enter project name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder='Enter project description' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='categoryId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select
                  disabled={isCategoriesLoading}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Select category' />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((category) => (
                      <SelectItem key={category.id} value={String(category.id)}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='image'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  type='file'
                  accept='image/*'
                  onChange={(e) => {
                    handleFileImageChange(e);
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
                  className='mt-2 w-24 h-24 object-cover rounded'
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
export default CreateProjectForm;
