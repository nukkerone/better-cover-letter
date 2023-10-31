import { type DefaultSession, type NextAuthOptions } from 'next-auth'
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import GithubProvider from "next-auth/providers/github";
import  { db } from "../lib/drizzle"


declare module 'next-auth' {
  interface Session {
    user: {
      /** The user's id. */
      id: string
    } & DefaultSession['user']
  }
}


export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      if (session && session.user) {
        session.user.id = token.sub as string
      }
      
      return session
    }
  }
};
