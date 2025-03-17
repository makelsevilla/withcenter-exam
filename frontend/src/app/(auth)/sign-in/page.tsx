import SigninForm from "@/components/auth/signin-form";
import { Box } from "@mui/material";

const LoginPage = () => {
  return (
    <Box sx={{ width: 1, maxWidth: "sm" }}>
      <SigninForm />
    </Box>
  );
};

export default LoginPage;
