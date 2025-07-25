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
import { Separator } from '../ui/separator';
import { Dropzone, DropzoneContent, DropzoneEmptyState } from '../ui/dropzone';
import { IconX } from '@tabler/icons-react';

const MAX_IMAGE_FILE_SIZE = 1 * 1024 * 1024; // 1MB
const MAX_VIDEO_FILE_SIZE = 100 * 1024 * 1024; // 100MB

const projectSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title must be less than 100 characters'),
  subTitle: z
    .string()
    .max(100, 'Subtitle must be less than 100 characters')
    .optional(),
  image: z
    .instanceof(File)
    .nullable()
    .optional()
    .refine((file) => !file || file.size <= MAX_IMAGE_FILE_SIZE, {
      message: 'Image size must be less than 1MB',
    }),
  description: z
    .string()
    .max(500, 'Description must be less than 500 characters')
    .optional(),
  categoryId: z.string().min(1, 'Category is required'),
  galleryImages: z
    .array(z.instanceof(File))
    .optional()
    .refine(
      (files) => files?.every((file) => file.size <= MAX_IMAGE_FILE_SIZE),
      {
        message: 'Each real image must be less than 1MB',
      }
    ),
  videoFiles: z
    .array(z.instanceof(File))
    .optional()
    .refine(
      (files) => files?.every((file) => file.size <= MAX_VIDEO_FILE_SIZE),
      {
        message: 'Each video image must be less than 100MB',
      }
    ),
});

const CreateProjectForm = () => {
  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
      subTitle: '',
      image: null as File | null,
      description: '',
      categoryId: '',
      galleryImages: [] as File[],
      videoFiles: [] as File[],
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
      queryClient.refetchQueries({ queryKey: ['projects'] });
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

  const [loading, setLoading] = useState(false);

  async function onSubmit(values: z.infer<typeof projectSchema>) {
    setLoading(true);
    const formDataImage = new FormData();
    if (values.image) {
      formDataImage.append('files', values.image);
    }

    const uploadImage = await fetch('/api/upload', {
      method: 'POST',
      body: formDataImage,
    });

    const resultImage = await uploadImage.json();

    const formDataGallery = new FormData();
    values.galleryImages?.forEach((file) => {
      formDataGallery.append('files', file);
    });

    const uploadGallery = await fetch('/api/upload', {
      method: 'POST',
      body: formDataGallery,
    });

    const resultGallery = await uploadGallery.json();

    const formDataVideo = new FormData();
    values.videoFiles?.forEach((file) => {
      formDataVideo.append('files', file);
    });

    const uploadVideo = await fetch('/api/upload', {
      method: 'POST',
      body: formDataVideo,
    });

    const resultVideo = await uploadVideo.json();
    setLoading(false);

    if (!resultImage.success) {
      alert('Upload failed for image');
      return;
    }

    if (!resultGallery.success) {
      alert('Upload failed for gallery images');
      return;
    }

    if (!resultVideo.success) {
      alert('Upload failed for video images');
      return;
    }

    mutate({
      title: values.title,
      subTitle: values.subTitle,
      image: resultImage.files[0],
      description: values.description,
      category: {
        connect: {
          id: parseInt(values.categoryId),
        },
      },
      galleryImages: resultGallery.files,
      videoFiles: resultVideo.files,
    });
  }

  const [galleryImages, setGalleryImages] = useState<File[] | undefined>();
  const handleDropImages = (files: File[]) => {
    setGalleryImages(files);
    form.setValue('galleryImages', files);
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...(galleryImages || [])];
    updatedImages.splice(index, 1);
    setGalleryImages(updatedImages);
    form.setValue('galleryImages', updatedImages);
  };

  const previewGalleryImages =
    galleryImages?.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
    })) || [];

  const [videoFiles, setVideoFiles] = useState<File[] | undefined>();
  const handleDropVideos = (files: File[]) => {
    setVideoFiles(files);
    form.setValue('videoFiles', files);
  };

  const handleRemoveVideo = (index: number) => {
    const updatedVideos = [...(videoFiles || [])];
    updatedVideos.splice(index, 1);
    setVideoFiles(updatedVideos);
    form.setValue('videoFiles', updatedVideos);
  };

  const previewVideoFiles =
    videoFiles?.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
    })) || [];

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
          name='subTitle'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subtitle</FormLabel>
              <FormControl>
                <Input placeholder='Enter project subtitle' {...field} />
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

        <Separator className='my-6' />

        <h4 className='font-semibold'>
          Gallery Images{' '}
          {previewGalleryImages.length > 0 &&
            `(${previewGalleryImages.length})`}
        </h4>

        <div className='flex flex-col space-y-2'>
          <Dropzone
            accept={{ 'image/*': [] }}
            maxFiles={10}
            maxSize={1024 * 1024 * 10}
            minSize={1024}
            onDrop={handleDropImages}
            onError={console.error}
            src={galleryImages}
          >
            <DropzoneEmptyState />
            <DropzoneContent />
          </Dropzone>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {previewGalleryImages.map((file, index) => (
            <div
              key={index}
              className='flex items-center justify-between space-x-2 p-2 border rounded'
            >
              <div className='flex items-center space-x-2'>
                <Image
                  src={URL.createObjectURL(galleryImages![index])}
                  alt={file.name}
                  width={50}
                  height={50}
                  className='object-cover rounded'
                />
                <div>
                  <p className='text-xs font-medium line-clamp-2'>
                    {file.name}
                  </p>
                  <p className='text-xs text-muted-foreground'>
                    {Math.round(file.size / 1024)} KB
                  </p>
                </div>
              </div>
              <Button
                type='button'
                variant='secondary'
                className='bg-red-100 text-red-500 hover:bg-red-200 hover:text-red-600'
                size={'icon'}
                onClick={() => handleRemoveImage(index)}
              >
                <IconX size={16} />
              </Button>
            </div>
          ))}
        </div>

        <Separator className='my-6' />

        <h4 className='font-semibold'>
          Video Files
          {previewVideoFiles.length > 0 && `(${previewVideoFiles.length})`}
        </h4>

        <div className='flex flex-col space-y-2'>
          <Dropzone
            accept={{ 'video/*': [] }}
            maxFiles={5}
            maxSize={1024 * 1024 * 100}
            minSize={1024}
            onDrop={handleDropVideos}
            onError={console.error}
            src={videoFiles}
          >
            <DropzoneEmptyState />
            <DropzoneContent />
          </Dropzone>
        </div>

        <Separator className='my-6' />

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {previewVideoFiles.map((file, index) => (
            <div
              key={index}
              className='flex items-center justify-between space-x-2 p-2 border rounded'
            >
              <div className='flex items-start text-left flex-col'>
                <p className='text-xs font-medium truncate max-w-[200px]'>
                  {file.name}
                </p>
                <p className='text-xs text-muted-foreground'>
                  {Math.round(file.size / (1024 * 1024))} MB
                </p>
              </div>
              <Button
                type='button'
                variant='secondary'
                className='bg-red-100 text-red-500 hover:bg-red-200 hover:text-red-600'
                size={'icon'}
                onClick={() => handleRemoveVideo(index)}
              >
                <IconX size={16} />
              </Button>
            </div>
          ))}
        </div>

        <Button type='submit' className='mt-2' loading={isPending || loading}>
          Save
        </Button>
      </form>
    </Form>
  );
};
export default CreateProjectForm;
