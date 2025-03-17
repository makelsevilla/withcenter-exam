import axios from "@/lib/axios";
import { FormErrorObj } from "@/types";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

type LoginProps = {
  setErrors: Dispatch<SetStateAction<FormErrorObj>>;
  username: string;
  password: string;
};

export const useAuth = () => {
  const router = useRouter()

  const login = async ({ setErrors, username, password }: LoginProps) => {
    setErrors({}); // errors reset

    try {
      const res = await axios.post("/api/auth/login", {
        email: username,
        password,
      });

      const apiToken = res.data.token;
      if (apiToken) {
        localStorage.setItem("apiToken", apiToken);
        router.push("/");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        if (![422, 400].includes(error.response?.status || 0)) throw error;

        setErrors(error.response?.data.errors);
        return;
      }

      throw error;
    }
  };

  return {
    login,
  };
};
