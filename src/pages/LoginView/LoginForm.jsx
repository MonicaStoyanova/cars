// MUI
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// Background image
import backgroundImage from "../../resources/background/carSideMIrror.jpg";
import logo from "../../resources/cars.png";
// React and Redux
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { loginRequest } from "./LoginAction";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import { themeColors } from "../../theme/colors";

function Copyright() {
  return (
    <>
      <Box
        component="img"
        src={logo}
        sx={{ width: 200, height: "auto", mt: 2, mb: 1 }}
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

export default function LoginForm() {
  useAuthRedirect();
  const usernameRef = useRef("");
  const passwordRef = useRef("");

  const dispatch = useDispatch();

  const { loginError } = useSelector((state) => state.loginReducer);

  const onSubmit = (event) => {
    event.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    if (username && password) {
      dispatch(loginRequest(username, password));
    } else {
      alert("Both fields are required");
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
            Sign in
          </Typography>
          {loginError && (
            <Typography color="error" align="center">
              {loginError}
            </Typography>
          )}
          <Box
            component="form"
            onSubmit={onSubmit}
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
              inputRef={usernameRef}
              autoFocus
              variant="outlined"
              InputProps={{
                sx: {
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: themeColors.darkBlue,
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
              inputRef={passwordRef}
              variant="outlined"
              InputProps={{
                sx: {
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: themeColors.darkBlue,
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
                backgroundColor: themeColors.darkBlue,
                "&:hover": {
                  backgroundColor: themeColors.onHoverBlue, // hover color
                },
              }}
            >
              Sign In
            </Button>
            <Grid container direction="column" alignItems="center">
              <Grid item xs>
                <Typography variant="body2">
                  <Link to={"/register"}>{"Don't have an account?"}</Link>
                </Typography>
              </Grid>
              <Grid item xs>
                <Link to={"/"} variant="body2">
                  Continue to catalog
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
