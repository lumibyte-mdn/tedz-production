import { betterAuth, User } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { headers } from 'next/headers';
import { inferAdditionalFields } from 'better-auth/client/plugins';
import { nextCookies } from 'better-auth/next-js';
import { PrismaClient } from '@/prisma/generated/prisma';

const prisma = new PrismaClient();

const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql', // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
    // sendResetPassword: async ({ user, token }) => {
    //   await sendForgotPasswordEmail({
    //     to: user.email,
    //     data: {
    //       user_name: user.name || user.email,
    //       support_email: env.SUPPORT_EMAIL,
    //     },
    //     url: `${env.BETTER_AUTH_URL}/auth/reset-password?token=${token}`,
    //   });
    // },
    resetPasswordTokenExpiresIn: 1 * 60 * 60, // 1 hour
  },
  socialProviders: {},
  plugins: [
    inferAdditionalFields({
      user: {
        // Add any additional fields you want to infer
      },
    }),
    nextCookies(),
  ],
  user: {
    deleteUser: {
      enabled: true,
    },
  },
});

export type ServerSession = typeof auth.$Infer.Session;

export const getUser = async (): Promise<User | null> => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  return session?.user ?? null;
};

export default auth;
