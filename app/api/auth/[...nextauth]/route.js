import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/prisma/client";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) return null;

        try {
          const user = await prisma.user.findFirst({
            where: {
              email: credentials.email,
              password: credentials.password,
            },
          });

          return user
            ? { id: user.id, email: user.email, name: user.username }
            : null;
        } catch (error) {
          console.error("Ошибка при аутентификации:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return { ...session, user: { ...session.user, id: token.id } };
    },
    jwt: ({ token, user }) => {
      if (user) {
        return { ...token, id: user.id };
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
