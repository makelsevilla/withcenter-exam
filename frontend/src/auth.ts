import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "./lib/axios";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
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
  ],
});
