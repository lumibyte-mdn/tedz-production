'use server';

import db from '@/lib/db';
import { Prisma, Project } from '@/prisma/generated/prisma';

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
      },
    });

    return projects;
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}

export async function createProjectApi(
  data: Prisma.ProjectCreateInput
): Promise<Project> {
  try {
    const project = await db.project.create({
      data,
    });

    return project;
  } catch (error) {
    console.error('Failed to create project:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}

export async function updateProjectApi(
  id: number,
  data: Prisma.ProjectUpdateInput
): Promise<Project> {
  try {
    const project = await db.project.update({
      where: { id },
      data,
    });

    return project;
  } catch (error) {
    console.error('Failed to update project:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}

export async function deleteProjectApi(id: number): Promise<Project> {
  try {
    const project = await db.project.delete({
      where: { id },
    });

    return project;
  } catch (error) {
    console.error('Failed to delete project:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}
