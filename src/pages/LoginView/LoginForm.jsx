import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import logo from "../../resources/cars.png";

function Copyright() {
  return (
    <>
      <Box
        component="img"
        src={logo}
        sx={{ width: 200, height: "auto", mt: 2, mb: 1 }} // Adjust margin or padding as needed
        alt="Car Logo"
      />
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © Simple Cars "}

        {new Date().getFullYear()}
        {"."}
      </Typography>
    </>
  );
}

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          padding: 3,
          borderRadius: 1,
          width: "100%", // Ensures the Box occupies the full width of its parent Container
        }}
      >
        <Typography component="h1" variant="h5" fontWeight="bold">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1, width: "100%" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            variant="outlined"
            InputProps={{
              sx: {
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgb(15, 35, 140)",
                },
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            variant="outlined"
            InputProps={{
              sx: {
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgb(15, 35, 140)",
                },
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              fontWeight: "bold",
              backgroundColor: "rgb(15, 35, 140)",
              "&:hover": {
                backgroundColor: "rgb(38, 56, 147)", // hover color
              },
            }}
          >
            Sign In
          </Button>
          <Grid container direction="column" alignItems="center">
            <Grid item xs>
              <Typography variant="body2">
                {"Don't have an account?"}
              </Typography>
            </Grid>
            <Grid item xs>
              <Link href="/catalog" variant="body2">
                Continue to catalog
              </Link>
            </Grid>
          </Grid>
        </Box>
        <Copyright sx={{ mt: 4 }} />
      </Box>
    </Container>
  );
}
