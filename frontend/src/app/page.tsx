import Image from "next/image";
import styles from "./page.module.css";
import { Box, Button, Container, Typography } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="md">
      <Typography variant="h1">Hello WOrld</Typography>
      <Box sx={{display: "flex", gap: 4}}>
        <Button>Button</Button>
        <Button variant="outlined">Button</Button>
        <Button variant="contained">Button</Button>
      </Box>
    </Container>
  );
}
