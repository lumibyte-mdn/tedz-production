'use server';

import db from '@/lib/db';
import { Prisma, Project } from '@/prisma/generated/prisma';

export interface GetProjectListProps {
  categoryId?: number | null;
}

export async function getProjectListApi({
  categoryId,
}: GetProjectListProps): Promise<Project[]> {
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
}
