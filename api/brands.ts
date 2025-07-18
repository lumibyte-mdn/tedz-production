'use server';

import db from '@/lib/db';
import { Brand, Prisma } from '@/prisma/generated/prisma';

export async function getBrandListApi(): Promise<Brand[]> {
  try {
    const brands = await db.brand.findMany({
      orderBy: {
        name: 'desc',
      },
    });

    return brands;
  } catch (error) {
    console.error('Failed to fetch brands:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}

export async function createBrandApi(
  data: Prisma.BrandCreateInput
): Promise<Brand> {
  try {
    const brand = await db.brand.create({
      data,
    });

    return brand;
  } catch (error) {
    console.error('Failed to create brand:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}

export async function updateBrandApi(
  id: number,
  data: Prisma.BrandUpdateInput
): Promise<Brand> {
  try {
    const brand = await db.brand.update({
      where: { id },
      data,
    });

    return brand;
  } catch (error) {
    console.error('Failed to update brand:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}

export async function deleteBrandApi(id: number): Promise<Brand> {
  try {
    const brand = await db.brand.delete({
      where: { id },
    });

    return brand;
  } catch (error) {
    console.error('Failed to delete brand:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}
