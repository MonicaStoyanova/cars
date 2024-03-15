// MUI
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// Background image
import logo from "../../resources/cars.png";
// React and Redux
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { loginRequest } from "./LoginAction";
import useAuthRedirect from "../../hooks/useAuthRedirect";

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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true); // state for the submit button

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.loginReducer.isLoggedIn);
  const loginError = useSelector((state) => state.loginReducer.loginError);

  // take the entered username, update the state
  const onChangeUsername = (event) => {
    const username = event.target.value; // check if there is a username
    if (username !== "") setUsername(username);
  };
  // take the entered password, update the state
  const onChangePassword = (event) => {
    const password = event.target.value;
    if (password !== "") setPassword(password);
  };
  // enable submit button if username and password are present
  useEffect(() => {
    if (username && password) setIsDisabled(false);
  }, [username, password]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  // on clicking submit, send the collected credentials (which we previously saved in the state) to trigger action
  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(loginRequest(username, password));
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
            value={username}
            onChange={onChangeUsername}
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
            value={password}
            onChange={onChangePassword}
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
            disabled={isDisabled}
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
  );
}
