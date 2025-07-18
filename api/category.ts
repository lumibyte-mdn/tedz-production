'use server';

import db from '@/lib/db';
import { Category } from '@/prisma/generated/prisma';

export async function getCategoryListApi(): Promise<Category[]> {
  const categories = await db.category.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return categories;
}
