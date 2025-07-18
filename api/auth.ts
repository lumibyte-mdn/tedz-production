'use server';

import auth from '@/lib/auth';
import db from '@/lib/db';
import env from '@/lib/env';
import { BetterAuthError, User } from 'better-auth';
import { headers } from 'next/headers';

type LoginApiProps = {
  email: string;
  password: string;
};

export async function loginApi(payload: LoginApiProps): Promise<User | null> {
  try {
    const session = await auth.api.signInEmail({
      body: {
        email: payload.email,
        password: payload.password,
      },
    });

    if (!session) {
      throw new Error('Email or password is incorrect');
    }

    return session?.user;
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}

export async function logoutApi(): Promise<boolean> {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });

    return true;
  } catch (error) {
    console.error('Logout failed:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}

export async function getUserApi(): Promise<User | null> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(), // you need to pass the headers object.
    });

    return session?.user || null;
  } catch (error) {
    console.error('Get user failed:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}

export async function checkAdminAccountApi(): Promise<boolean> {
  try {
    const admin = await db.user.aggregate({
      _count: {
        id: true,
      },
    });

    if (!admin._count.id) {
      return false;
    }

    return true;
  } catch (error) {
    console.error('Check admin account failed:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}

type GenerateAdminProps = {
  fullName: string;
  email: string;
  password: string;
};

export async function generateAdminApi(
  payload: GenerateAdminProps
): Promise<User | null> {
  try {
    const session = await auth.api.signUpEmail({
      body: {
        email: payload.email,
        password: payload.password,
        name: payload.fullName,
      },
    });

    if (!session) {
      throw new Error('Failed to create admin account');
    }

    return session?.user;
  } catch (error) {
    console.error('Failed to create admin account:', error);
    if (error instanceof BetterAuthError) {
      throw new Error(error.message);
    }

    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}
