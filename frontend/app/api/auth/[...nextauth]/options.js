import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import AppleProvider from "next-auth/providers/apple";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

export const options = {
  providers: [
    CredentialsProvider({
      name: "Client Credentials",
      credentials: {
        email: {
          type: "email",
        },
        password: {
          type: "password",
        },
      },
      async authorize(credentials) {
        // const res = await fetch();
        // const user = await res.json();
        const user = { id: "01", email: "test@test.test", password: "test" };

        if (
          credentials?.email === user.email &&
          credentials?.password === user.password
        ) {
          return user;
        }
        return null;
        // if (res.ok && user) {
        //   return user;
        // }
        // return null;
      },
    }),
    CredentialsProvider({
      name: "Admin Credentials",
      credentials: {
        email: {},
      },
    }),
  ],
};
