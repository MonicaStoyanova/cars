//MUI
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
//React & Redux
import { useEffect, useState } from "react";
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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true); // submit button

  const dispatch = useDispatch();

  // handle user input
  const onChangeFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const onChangeLastName = (event) => {
    setLastName(event.target.value);
  };

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  // enable the button only if all fields are filled out and meet the length requirements
  useEffect(() => {
    const isUsernameValid = username.length > 2;
    const isPasswordValid = password.length > 5;
    const areFieldsFilled = firstName && lastName && username && password;

    setIsDisabled(!(areFieldsFilled && isUsernameValid && isPasswordValid));
  }, [firstName, lastName, username, password]);

  const onSubmitRegistration = (event) => {
    event.preventDefault();
    dispatch(registerUser(firstName, lastName, username, password));
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
            backgroundColor: themeColors.transparenWhite,
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
                  value={firstName}
                  onChange={onChangeFirstName}
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
                  value={lastName}
                  onChange={onChangeLastName}
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
                  helperText="Username should be at least 3 characters long"
                  value={username}
                  onChange={onChangeUsername}
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
                  helperText="Password should be at least 6 characters long"
                  value={password}
                  onChange={onChangePassword}
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
              disabled={isDisabled}
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
