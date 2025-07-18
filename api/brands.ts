'use server';

import db from '@/lib/db';
import { Brand } from '@/prisma/generated/prisma';

export async function getBrandListApi(): Promise<Brand[]> {
  const brands = await db.brand.findMany({
    orderBy: {
      name: 'desc',
    },
  });

  return brands;
}
