'use server';

import db from '@/lib/db';
import env from '@/lib/env';
import { Brand, Prisma } from '@/prisma/generated/prisma';
import { unlink } from 'fs/promises';

export async function getBrandListApi(): Promise<Brand[]> {
  try {
    const brands = await db.brand.findMany({
      orderBy: {
        name: 'desc',
      },
    });

    brands.forEach((item) => {
      if (item.logo) {
        item.logo = env.NEXT_PUBLIC_CDN_URL + item.logo;
      }
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

export async function updateBrandApi({
  id,
  data,
}: {
  id: number;
  data: Prisma.BrandUpdateInput;
}): Promise<Brand> {
  try {
    const existingBrand = await db.brand.findUnique({
      where: { id },
    });

    if (!existingBrand) {
      throw new Error('Brand not found');
    }

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

export async function deleteBrandApi(id: number | string): Promise<Brand> {
  try {
    const existingBrand = await db.brand.findUnique({
      where: { id: parseInt(id as string) },
    });

    if (!existingBrand) {
      throw new Error('Brand not found');
    }

    if (existingBrand.logo) {
      const logoPath = `public/uploads/${existingBrand.logo}`;
      // unlink the logo file if necessary
      await unlink(logoPath).catch((err) =>
        console.error('Failed to delete logo file:', err)
      );
    }

    const brand = await db.brand.delete({
      where: { id: parseInt(id as string) },
    });

    return brand;
  } catch (error) {
    console.error('Failed to delete brand:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}
