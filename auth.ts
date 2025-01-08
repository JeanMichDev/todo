import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  // // callbacks: {
  // //   session({ session, user }) {
  // //     if (!session.user) return session;
  // //     session.user.id = user.id;
  // //     session.user.image = user.image;
  // //     return session;
  // //   },
  // },
});
