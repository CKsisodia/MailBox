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
import { useDispatch } from "react-redux";
import { getUserDataAction, updateProfileAction } from "../reducer/asyncAuth";
import { useNavigate } from "react-router-dom";

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  palette: {
    updateColor: createColor("#00cc66"),
  },
});

const userProfileSchema = yup.object().shape({
  displayName: yup.string().required("Enter Your Name"),
  photoUrl: yup.string().required("Enter Photo Url "),
});

export default function UserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userProfileHandler = (profileData, event) => {
    event.preventDefault();
    dispatch(
      updateProfileAction({
        displayName: profileData.displayName,
        photoUrl: profileData.photoUrl,
      })
    );
    setTimeout(() => {
      dispatch(getUserDataAction());
    }, 1000);

    navigate("/");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userProfileSchema),
  });

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          background: "linear-gradient(to right, #ff99ff,#cccc00)",
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
            My Profile
          </Typography>
          <Box
            component="form"
            sx={{ mt: 3 }}
            onSubmit={handleSubmit(userProfileHandler)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="displayName"
                  type="text"
                  label="Your Name"
                  name="displayName"
                  autoComplete="displayName"
                  {...register("displayName")}
                />
                <p style={{ color: "#DC143C" }}>
                  {errors.displayName?.message}
                </p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="photoUrl"
                  label="Photo Url"
                  type="text"
                  id="photoUrl"
                  autoComplete="photoUrl"
                  {...register("photoUrl")}
                />
                <p style={{ color: "#DC143C" }}>{errors.photoUrl?.message}</p>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="updateColor"
              sx={{ mt: 3, mb: 2, bgcolor: "#00ffff" }}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
