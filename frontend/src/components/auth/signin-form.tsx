"use client";

import { useAuth } from "@/hooks/auth";
import { FormErrorObj } from "@/types";
import {
  Button,
  Stack,
  TextField,
} from "@mui/material";
import { FormEventHandler, useState } from "react";

type FormData = {
  username: string;
  password: string;
};
export default function SigninForm() {
  const [data, setData] = useState<FormData>({ username: "", password: "" });
  const [errors, setErrors] = useState<FormErrorObj>({});

  console.log(data);

  const { login } = useAuth();

  const emailHasError = errors?.email?.length > 0;

  // fn
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    console.log("hey");
    e.preventDefault();

    try {
      login({ setErrors, username: data.username, password: data.password });
    } catch (error) {
      console.error(error);
    }

    setData({ ...data, password: "" });
  };
  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          size="small"
          value={data.username}
          onChange={(e) =>
            setData((old) => ({ ...old, username: e.target.value }))
          }
          helperText={
            <>
              {emailHasError ? errors.email.map((text, index) => <span key={index}>{text}</span>) : null}
            </>
          }
          error={emailHasError}
        />
        <TextField
          label="password"
          type="password"
          variant="outlined"
          size="small"
          value={data.password}
          onChange={(e) =>
            setData((old) => ({ ...old, password: e.target.value }))
          }
        />
        <Button type="submit" variant="contained">
          Sign in
        </Button>
      </Stack>
    </form>
  );
}
