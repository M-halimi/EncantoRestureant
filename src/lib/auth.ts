import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { compare } from "bcryptjs"
import { prisma } from "./prisma"

declare module "next-auth" {
  interface User {
    role?: string
  }
  interface Session {
    user: {
      id: string
      name: string
      email: string
      role: string
    }
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string
    role: string
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(c) {
        const email = c.email as string
        const password = c.password as string

        const user = await prisma.adminUser.findUnique({ where: { email } })
        if (!user) return null

        const valid = await compare(password, user.password)
        if (!valid) return null

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id ?? token.id
        token.role = (user.role as string) ?? token.role
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      session.user.role = token.role
      return session
    },
  },
})
