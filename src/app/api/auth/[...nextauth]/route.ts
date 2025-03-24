import NextAuth, { User } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import clientPromise from "@/lib/db";

import { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }
        try {
          const client = await clientPromise;
          const db = client.db("pnl_data");

          const user = await db.collection("users").findOne({email: credentials.email, password: credentials.password});

          if (user) {
            return {email: user!.email, name: user.username} as User;
          } else {
            throw new Error("Invalid email or password");
          }
        } catch (error) {
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },

  callbacks: {
    async session({ session }: any) {
      return session;
    },
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }