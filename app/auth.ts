import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import type { Player } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
 
async function getPlayer(email: string): Promise<Player | undefined> {
  try {
    const user = await sql<Player>`SELECT * FROM players WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function getAuthPlayer () {
  const session = await auth();
  if (session?.user) {
    if (session.user.email) {
      const player = await getPlayer(session.user.email);
      return player;
    }
  }
  return null;
}

export const authOptions = {
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
 
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getPlayer(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
 
          if (passwordsMatch) return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
      redirect: async ({ url, baseUrl } : any) => {
          return url.startsWith(baseUrl) ? url : baseUrl;
      },
  },
};
 
export const { auth, signIn, signOut } = NextAuth(authOptions);