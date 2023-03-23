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
import { useDispatch } from "react-redux";
import { signUpUserAction } from "../../reducer/asyncAuth";


const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
    palette: {
      steelBlue: createColor("#00ffff"),
    },
  });

const signUpSchema = yup.object().shape({
  email: yup.string().email().required("Enter Email"),
  password: yup
    .string()
    .min(6)
    .max(15)
    .required("Password Must Be atleast of 6"),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
});

export default function SignUp() {
  const navigate = useNavigate();
    const dispatch = useDispatch();

  const signUpFormSubmitHandler = (data, event) => {
    event.preventDefault();
    dispatch(signUpUserAction(data));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const navToLoginPage = () => {
    navigate("/login");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          background: "linear-gradient(to right, #66ff33,#ffff4d)",
          borderRadius: 4,
          boxShadow: 8,
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
            Sign up
          </Typography>
          <Box
            component="form"
            sx={{ mt: 3 }}
            onSubmit={handleSubmit(signUpFormSubmitHandler)}
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
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  {...register("confirmPassword")}
                />
                <p style={{ color: "#DC143C" }}>
                  {errors.confirmPassword && "Password Shoud Match"}
                </p>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="steelBlue"
              sx={{ mt: 3, mb: 2, bgcolor: "#008fb3" }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography
                  variant="body2"
                  sx={{ cursor: "pointer", color: "green" }}
                  onClick={navToLoginPage}
                >
                  Already have an account? Log in
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
