'use server';

import db from '@/lib/db';
import env from '@/lib/env';
import {
  Prisma,
  Project,
  ProjectImage,
  ProjectVideo,
} from '@/prisma/generated/prisma';
import path from 'path';
import fs from 'fs';

export interface GetProjectListProps {
  categoryId?: number | null;
}

export async function getProjectListApi({
  categoryId,
}: GetProjectListProps = {}): Promise<
  Prisma.ProjectGetPayload<{ include: { category: true } }>[]
> {
  try {
    const where: Prisma.ProjectWhereInput = {};

    if (categoryId) {
      where.categoryId = categoryId;
    }

    const projects = await db.project.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        category: true,
        projectImages: {
          select: {
            image: true,
          },
        },
        projectVideos: {
          select: {
            video: true,
          },
        },
      },
    });

    projects.forEach((item: any) => {
      if (item.image) {
        item.image = env.NEXT_PUBLIC_CDN_URL + item.image;
      }
    });

    return projects;
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}

export async function createProjectApi(
  data: Prisma.ProjectCreateInput & {
    galleryImages?: string[];
    videoFiles?: string[];
  }
): Promise<Project> {
  try {
    const { galleryImages, videoFiles, ...rest } = data;

    const project = await db.project.create({
      data: rest,
    });

    if (galleryImages && galleryImages.length > 0) {
      await db.projectImage.createMany({
        data: galleryImages.map((image) => ({
          projectId: project.id,
          image,
        })),
      });
    }

    if (videoFiles && videoFiles.length > 0) {
      await db.projectVideo.createMany({
        data: videoFiles.map((video) => ({
          projectId: project.id,
          video,
        })),
      });
    }

    return project;
  } catch (error) {
    console.error('Failed to create project:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}

export async function updateProjectApi({
  id,
  data,
}: {
  id: number;
  data: Prisma.ProjectUpdateInput & {
    galleryImages?: string[];
    videoFiles?: string[];
  };
}): Promise<Project> {
  try {
    const { galleryImages, videoFiles, image, ...rest } = data;

    const project = await db.project.findUnique({
      where: { id },
      include: {
        projectImages: true,
        projectVideos: true,
      },
    });

    const updatedProject = await db.project.update({
      where: { id },
      data: {
        ...rest,
        image: image ? image : project?.image, // Use new image if provided, otherwise keep the old one
      },
    });

    if (galleryImages && galleryImages.length > 0) {
      await db.projectImage.createMany({
        data: galleryImages.map((image) => ({
          projectId: id,
          image,
        })),
      });
    }

    if (videoFiles && videoFiles.length > 0) {
      await db.projectVideo.createMany({
        data: videoFiles.map((video) => ({
          projectId: id,
          video,
        })),
      });
    }

    return updatedProject;
  } catch (error) {
    console.error('Failed to update project:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}

export async function deleteVideoApi(
  id: number | string
): Promise<ProjectVideo> {
  try {
    const video = await db.projectVideo.delete({
      where: { id: parseInt(id as string) },
    });

    return video;
  } catch (error) {
    console.error('Failed to delete video:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}

export async function deleteImageApi(
  id: number | string
): Promise<ProjectImage> {
  try {
    const image = await db.projectImage.delete({
      where: { id: parseInt(id as string) },
    });

    return image;
  } catch (error) {
    console.error('Failed to delete image:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}

const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH ?? '', 'public/uploads');

export async function deleteProjectApi(id: number | string): Promise<Project> {
  try {
    const project = await db.project.findUnique({
      where: { id: parseInt(id as string) },
      include: {
        projectImages: true,
        projectVideos: true,
      },
    });

    if (!project) {
      throw new Error('Project not found');
    }

    // Delete associated images
    if (project.projectImages.length > 0) {
      const imagePaths = project.projectImages.map((image: any) => image.image);

      for (const imagePath of imagePaths) {
        try {
          const filePath = path.resolve(UPLOAD_DIR, imagePath);

          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        } catch (err) {
          console.warn(`Failed to delete image file at ${imagePath}:`, err);
        }
      }

      await db.projectImage.deleteMany({
        where: { projectId: project.id },
      });
    }

    // Delete associated videos
    if (project.projectVideos.length > 0) {
      const videoPaths = project.projectVideos.map((video) => video.video);

      for (const videoPath of videoPaths) {
        try {
          const filePath = path.resolve(UPLOAD_DIR, videoPath);

          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        } catch (err) {
          console.warn(`Failed to delete video file at ${videoPath}:`, err);
        }
      }

      await db.projectVideo.deleteMany({
        where: { projectId: project.id },
      });
    }

    // Delete the project itself
    await db.project.delete({
      where: { id: project.id },
    });

    return project;
  } catch (error) {
    console.error('Failed to delete project:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}

export async function getProjectDetailApi(id: number | string): Promise<
  Prisma.ProjectGetPayload<{
    include: {
      category: true;
      projectImages: true;
      projectVideos: true;
    };
  }>
> {
  try {
    const project = await db.project.findUnique({
      where: { id: parseInt(id as string) },
      include: {
        category: true,
        projectImages: {
          orderBy: {
            id: 'asc',
          },
        },
        projectVideos: {
          orderBy: {
            id: 'asc',
          },
        },
      },
    });

    if (!project) {
      throw new Error('Project not found');
    }

    if (project.image) {
      project.image = env.NEXT_PUBLIC_CDN_URL + project.image;
    }

    // Format image URLs
    project.projectImages.forEach((item) => {
      item.image = env.NEXT_PUBLIC_CDN_URL + item.image;
    });

    // Format video URLs
    project.projectVideos.forEach((item) => {
      item.video = env.NEXT_PUBLIC_CDN_URL + item.video;
    });

    return project;
  } catch (error) {
    console.error('Failed to fetch project detail:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}
