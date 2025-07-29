'use server';

import db from '@/lib/db';
import { Category, Prisma } from '@/prisma/generated/prisma';

export async function getCategoryListApi(): Promise<Category[]> {
  try {
    const categories = await db.category.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return categories;
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}

export async function createCategoryApi(
  data: Prisma.CategoryCreateInput
): Promise<Category> {
  try {
    const category = await db.category.create({
      data,
    });

    return category;
  } catch (error) {
    console.error('Failed to create category:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}

export async function updateCategoryApi({
  id,
  data,
}: {
  id: number;
  data: Prisma.CategoryUpdateInput;
}): Promise<Category> {
  try {
    const category = await db.category.update({
      where: { id },
      data,
    });

    return category;
  } catch (error) {
    console.error('Failed to update category:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}

export async function deleteCategoryApi(
  id: number | string
): Promise<Category> {
  try {
    const category = await db.category.delete({
      where: { id: parseInt(id as string) },
    });

    return category;
  } catch (error) {
    console.error('Failed to delete category:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}
