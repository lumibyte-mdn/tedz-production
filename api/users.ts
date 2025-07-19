'use server';

import db from '@/lib/db';
import { User, Prisma } from '@/prisma/generated/prisma';
import { headers } from 'next/headers';
import auth from '@/lib/auth';
import { UserWithRole } from 'better-auth/plugins';

export async function getUserListApi(): Promise<UserWithRole[]> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const user = session?.user || null;

    if (!user || !user.id) {
      throw new Error('Unauthorized access');
    }

    const users = await auth.api.listUsers({
      query: {
        sortBy: 'createdAt',
        sortDirection: 'desc',
        filterField: 'id',
        filterOperator: 'ne',
        filterValue: user.id,
      },
      headers: await headers(),
    });

    return users?.users || [];
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}

type GenerateAdminProps = {
  fullName: string;
  email: string;
  password: string;
};

export async function createUserApi(
  data: GenerateAdminProps
): Promise<UserWithRole> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const user = session?.user || null;

    if (!user || !user.id) {
      throw new Error('Unauthorized access');
    }

    const newUser = await auth.api.createUser({
      body: {
        name: data.fullName,
        email: data.email,
        password: data.password,
        role: 'admin',
      },
    });

    if (!newUser) {
      throw new Error('Failed to create user');
    }

    return newUser.user;
  } catch (error) {
    console.error('Failed to create user:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}

type UpdateUserProps = {
  id: string;
  data: {
    fullName?: string;
    password?: string;
  };
};

export async function updateUserApi({
  id,
  data,
}: UpdateUserProps): Promise<User> {
  try {
    const existingUser = await db.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new Error('User not found');
    }

    if (data.password) {
      const ctx = await auth.$context;
      const passwordHash = await ctx.password.hash(data.password);
      await ctx.internalAdapter.updatePassword(existingUser.id, passwordHash);
    }

    const user = await db.user.update({
      where: { id },
      data: {
        name: data.fullName || existingUser.name,
      },
    });

    return user;
  } catch (error) {
    console.error('Failed to update user:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}

export async function deleteUserApi(id: number | string): Promise<User> {
  try {
    const existingUser = await db.user.findUnique({
      where: { id: id.toString() },
    });

    if (!existingUser) {
      throw new Error('User not found');
    }

    const user = await db.user.delete({
      where: { id: id.toString() },
    });

    return user;
  } catch (error) {
    console.error('Failed to delete user:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}
