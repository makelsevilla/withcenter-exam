import Axios from "axios";
import { getSession, signOut } from "next-auth/react";

const axios = Axios.create({
  baseURL: process.env.API_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
});

// Add a request interceptor to include the Authorization token only when needed
axios.interceptors.request.use(
  async (config) => {
    // Check if the request requires authentication
    if (config.withAuth) {
      const session = await getSession(); // Get NextAuth session

      if (session?.accessToken) {
        config.headers.Authorization = `Bearer ${session.accessToken}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Redirect to login if accessToken is expired
axios.interceptors.response.use(
  (response) => response, // Pass successful responses as is
  async (error) => {
    if (error.response?.status === 401) {
      await signOut({ callbackUrl: "/login" }); // Sign out and redirect to login page
    }
    return Promise.reject(error);
  }
);

export default axios;
