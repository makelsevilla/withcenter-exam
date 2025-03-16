import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "./lib/axios";

const providers = [
  Credentials({
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    credentials: {
      email: {},
      password: {},
    },
    authorize: async (credentials) => {
      try {
        const res = await axios.post("api/auth/login", credentials);
        const { user, token } = res.data;

        if (user && token) {
          return { ...user, accessToken: token }; // Store Express JWT in user object
        }
        return null;
      } catch (error) {
        throw new Error("Invalid credentials.");
      }
    },
  }),
];

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.accessToken = user.accessToken; // Store Express JWT in NextAuth token
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.accessToken = token.accessToken; // Pass Express JWT to session
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET, // Secret for JWT encryption
});
