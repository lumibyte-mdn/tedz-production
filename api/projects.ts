'use server';

import db from '@/lib/db';
import env from '@/lib/env';
import {
  Prisma,
  Project,
  ProjectImage,
  ProjectVideo,
} from '@/prisma/generated/prisma';

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

    projects.forEach((item) => {
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
    const { galleryImages, videoFiles, ...rest } = data;

    const project = await db.project.update({
      where: { id },
      data: rest,
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

    return project;
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

export async function deleteProjectApi(id: number | string): Promise<Project> {
  try {
    const project = await db.project.delete({
      where: { id: parseInt(id as string) },
    });

    return project;
  } catch (error) {
    console.error('Failed to delete project:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}
