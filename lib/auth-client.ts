import { User } from 'better-auth';
import { createAuthClient } from 'better-auth/react';
import env from './env';

const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: env.BETTER_AUTH_URL,
});

export type ClientSession = typeof authClient.$Infer.Session;

export const getUserClient = async (): Promise<{
  user: User | null;
  isPending: boolean;
  error: Error | null;
  refetch: () => void;
}> => {
  const { data: session, isPending, error, refetch } = authClient.useSession();
  return {
    user: session?.user ?? null,
    isPending,
    error,
    refetch,
  };
};

export default authClient;
