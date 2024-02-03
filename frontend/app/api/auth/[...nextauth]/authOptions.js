import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import AppleProvider from "next-auth/providers/apple";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import {
  checkLoginDetails,
  checkProviderAccountDetails,
} from "@/utils/user/auth/login";
import { checkAdminLoginDetails } from "@/utils/admin/auth/login";
import {
  handleFacebookRegister,
  handleGoogleRegister,
} from "@/utils/user/auth/register";

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
        rememberMe: {},
      },
      async authorize(credentials, req) {
        console.log("credentials", credentials);
        const response = await checkLoginDetails(
          credentials?.email,
          credentials?.password
        );

        console.log("response", response);

        const user = await response;
        if (credentials.rememberMe === "on") {
          user.maxAge = 30 * 24 * 60 * 60 * 1000;
        } else {
          user.maxAge = 24 * 60 * 60 * 1000;
        }

        console.log(user);
        if (user !== null && parseInt(user.status) === 1) {
          return user;
        } else if (user && parseInt(user.status) === 0) {
          throw new Error("not activated");
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
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      name: "facebook",

      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("user", user);
      console.log("account", account);
      console.log("profile", profile);
      if (account.provider === "google") {
        //   // Extract the email from the Google profile
        //   console.log(profile);
        const email = profile.email;

        const userFromDb = await checkProviderAccountDetails(email);

        console.log("user from db", userFromDb);

        if (!userFromDb) {
          const newUserFromDb = await handleGoogleRegister({
            email: email,
            given_name: profile.given_name,
            family_name: profile.family_name,
            at_hash: profile.at_hash,
          });

          console.log("new user from db", newUserFromDb);

          user.id = newUserFromDb.data.id;
          user.role = newUserFromDb.data.role;
          user.f_name = newUserFromDb.data.f_name;
          user.l_name = newUserFromDb.data.l_name;
          return true;
        }

        user.id = userFromDb.id;
        user.role = userFromDb.role;
        user.f_name = userFromDb.f_name;
        user.l_name = userFromDb.l_name;

        return true;
      }

      if (account.provider === "facebook") {
        const email = profile.email;

        const userFromDb = await checkProviderAccountDetails(email);

        console.log("user from db", userFromDb);

        if (!userFromDb) {
          const newUserFromDb = await handleFacebookRegister({
            email: email,
            given_name: profile.name,
            at_hash: profile.id,
          });

          console.log("new user from db", newUserFromDb);

          user.id = newUserFromDb.data.id;
          user.role = newUserFromDb.data.role;
          user.f_name = newUserFromDb.data.f_name;
          user.l_name = newUserFromDb.data.l_name;

          return true;
        }
        user.id = userFromDb.id;
        user.role = userFromDb.role;
        user.f_name = userFromDb.f_name;
        user.l_name = userFromDb.l_name;

        return true;
      }

      if ((account.type = "credentials") && user.id) return true;

      return null;
    },
    async jwt({ token, user, session, trigger, account }) {
      if (account) {
        console.log("JWT account", account);
        if (account.provider === "google") {
        }
      }
      if (trigger === "update") {
        token.f_name = session?.f_name;
        token.l_name = session?.l_name;
        token.email = session?.email;
        token.phone = session?.phone;
      }
      if (user) {
        console.log("jwt callback", { token, user, session });
        delete token.name;
        token.role = user?.role;
        token.id = user?.id;
        token.f_name = user?.f_name;
        token.l_name = user?.l_name;
        token.email = user?.email;
        token.phone = user?.phone;
        token.rememberMe = user?.rememberMe;
      }

      return token;
    },
    async session({ session, token }) {
      session.user = { ...token };
      // if (token.rememberMe) {
      //   session.expires = Date.now() + 30 * 24 * 60 * 60 * 1000; // 30 days
      // } else {
      //   // session.expires = Date.now() + 24 * 60 * 60 * 1000; // 1 day
      //   session.expires = Date.now() + 10000; // 1 day
      // }
      return session;
    },
  },
};
