//MUI
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
//React & Redux
import { useRef } from "react";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";

import { registerUser } from "./actions";
import useAuthRedirect from "../../hooks/useAuthRedirect";

import backgroundImage from "../../resources/background/carSideMIrror.jpg";
import { themeColors } from "../../theme/colors";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © Simple Cars "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignUp() {
  useAuthRedirect();
  const firstNameRef = useRef("");
  const lastNameRef = useRef("");
  const usernameRef = useRef("");
  const passwordRef = useRef("");

  const dispatch = useDispatch();

  const onSubmitRegistration = (event) => {
    event.preventDefault();
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    const isValid =
      firstName && lastName && username.length > 2 && password.length > 5;

    if (isValid) {
      dispatch(registerUser(firstName, lastName, username, password));
    } else if (username.length < 2) {
      alert("Username must be at least 3 characters");
    } else if (password.length < 5) {
      alert("Password must be at least 6 characters");
    } else {
      alert("All fields are required");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
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
            backgroundColor: themeColors.transparentWhite,
            padding: 3,
            borderRadius: 1,
            width: "100%",
          }}
        >
          <Typography component="h1" variant="h5" fontWeight="bold">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 3 }}
            onSubmit={onSubmitRegistration}
          >
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  inputRef={firstNameRef}
                  autoFocus
                  InputProps={{
                    sx: {
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: themeColors.darkBlue,
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  inputRef={lastNameRef}
                  autoComplete="family-name"
                  InputProps={{
                    sx: {
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: themeColors.darkBlue,
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  helperText="Username must be at least 3 characters long"
                  inputRef={usernameRef}
                  InputProps={{
                    sx: {
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: themeColors.darkBlue,
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  helperText="Password must be at least 6 characters long"
                  inputRef={passwordRef}
                  InputProps={{
                    sx: {
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: themeColors.darkBlue,
                      },
                    },
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                fontWeight: "bold",
                backgroundColor: themeColors.darkBlue,
                "&:hover": {
                  backgroundColor: themeColors.onHoverBlue, // hover color
                },
              }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item sx={{ mb: 1 }}>
                <Link to={"/login"} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Copyright sx={{ mt: 4 }} />
        </Box>
      </Container>
    </Box>
  );
}
