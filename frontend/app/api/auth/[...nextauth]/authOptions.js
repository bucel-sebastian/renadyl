import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import AppleProvider from "next-auth/providers/apple";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { checkLoginDetails } from "@/utils/user/auth/login";
import { checkAdminLoginDetails } from "@/utils/admin/auth/login";

export const authOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      id: "clientCredentials",
      name: "Client Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const response = await checkLoginDetails(
          credentials?.email,
          credentials?.password
        );
        const user = await response;
        if (user !== null) {
          return user;
        }
        return null;
      },
    }),
    CredentialsProvider({
      id: "adminCredentials",
      name: "Admin Credentials",
      credentials: {
        email: {
          type: "email",
        },
        password: {
          type: "password",
        },
      },
      async authorize(credentials) {
        const response = await checkAdminLoginDetails(
          credentials?.email,
          credentials?.password
        );

        const user = await response;
        user.role = "admin";

        if (user !== null) {
          return user;
        }
        return null;
      },
    }),
    AppleProvider({
      name: "Apple",
    }),
    GoogleProvider({
      name: "Google",
    }),
    FacebookProvider({
      name: "facebook",
    }),
  ],
  callbacks: {
    async jwt({ token, user, session }) {
      console.log("jwt callback", { token, user, session });
      if (user) {
        delete token.name;
        token.role = user?.role;
        token.id = user?.id;
        token.f_name = user?.f_name;
        token.l_name = user?.l_name;
        token.email = user?.email;
        token.phone = user?.phone;
      }

      return token;
    },
    async session({ session, token }) {
      console.log("session callback", { session, token });
      session.user = { ...token };
      console.log("session callback - 2", { session, token });
      // if (session?.user) session.user.role = "client";
      return session;
    },
  },
};
