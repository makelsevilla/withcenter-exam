"use client";

import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    // fontFamily: "var(--font-roboto)",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;
