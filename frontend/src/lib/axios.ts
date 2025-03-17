import Axios from "axios";

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
      const token = null; // implement getting token logic

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
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
      // clear cached token in localStorage 
      // redirect user to login
    }
    return Promise.reject(error);
  }
);

export default axios;
