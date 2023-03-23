import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  forgottPasswordAction,
  loginUserAction,
} from "../../reducer/asyncAuth";
import { useDispatch, useSelector } from "react-redux";

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  palette: {
    loginColor: createColor("#00ffff"),
    forgotColor: createColor("#00ffff"),
  },
});

const loginSchema = yup.object().shape({
  email: yup.string().email().required("Enter Email"),
  password: yup
    .string()
    .min(6)
    .max(15)
    .required("Password Must Be atleast of 6"),
});

const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email().required("Enter Email"),
});

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const forggotPasswordHandler = (email, event) => {
    event.preventDefault();
    dispatch(forgottPasswordAction(email));
  };

  const navToLoginPage = () => {
    navigate("/login");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        sx={{
          background: "linear-gradient(to right, #66ffe0,#ff99ff)",
          borderRadius: 4,
          boxShadow: 8,
          width: "550px",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 2,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Please enter your email here to reset password
          </Typography>
          <Box
            component="form"
            sx={{ mt: 3 }}
            onSubmit={handleSubmit(forggotPasswordHandler)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  type="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  {...register("email")}
                />
                <p style={{ color: "#DC143C" }}>{errors.email?.message}</p>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="forgotColor"
              sx={{ mt: 3, mb: 2, bgcolor: "green" }}
            >
              Send Link
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Typography
                  variant="body2"
                  sx={{ cursor: "pointer", color: "green" }}
                  onClick={navToLoginPage}
                >
                  Login Here
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.getUserData);

  React.useEffect(() => {
    if (userData) {
      navigate("/");
    }
  }, [userData]);

  const loginFormSubmitHandler = (data, event) => {
    event.preventDefault();
    dispatch(loginUserAction(data));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const navToSignUpPage = () => {
    navigate("/signup");
  };

  const navToForgotPasswordPage = () => {
    navigate("/forgotPassword");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        sx={{
          background: "linear-gradient(to right, #66fcf1,#66ff66)",
          borderRadius: 4,
          boxShadow: 8,
          width: "550px",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 2,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            sx={{ mt: 3 }}
            onSubmit={handleSubmit(loginFormSubmitHandler)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  type="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  {...register("email")}
                />
                <p style={{ color: "#DC143C" }}>{errors.email?.message}</p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...register("password")}
                />
                <p style={{ color: "#DC143C" }}>{errors.password?.message}</p>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="loginColor"
              sx={{ mt: 3, mb: 2, bgcolor: "#45a29e" }}
            >
              Login
            </Button>
            <Grid container justifyContent="space-between">
              <Typography
                sx={{ cursor: "pointer", color: "red" }}
                onClick={navToForgotPasswordPage}
              >
                Forgot Password ?
              </Typography>
              <Grid item>
                <Typography
                  variant="body2"
                  sx={{ cursor: "pointer", color: "green" }}
                  onClick={navToSignUpPage}
                >
                  New Member ? SignUp Here
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
