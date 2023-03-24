import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import mailBoxLogo from "../components/Images/mailBoxLogo.png";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authSliceAction } from "../reducer/authSlice";

const settings = ["My Profile", "Logout"];

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user.getUserData);

  const [userName, setUserName] = React.useState("");
  const [userPhoto, setUserPhoto] = React.useState("");

  React.useEffect(() => {
    if (userData) {
      getInfo();
    }
  }, [userData]);

  const getInfo = () => {
    setUserName(userData.displayName);
    setUserPhoto(userData.photoUrl);
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navToLoginForm = () => {
    navigate("/login");
  };

  const avtarHandler = (setting) => {
    if (setting === settings[0]) {
      navigate("/userProfile");
    } else if (setting === settings[1]) {
      dispatch(authSliceAction.logOutUser());
      navigate("/");
    }
  };
  
  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: "rgb(29,233,182)", p: 1.5 }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "#0b0c10",
                textDecoration: "none",
                fontSize: 30,
                gap: "15px",
                cursor: "pointer",
              }}
            >
              <img
                alt="mailBoxLogo"
                src={mailBoxLogo}
                width="50px"
                height="50px"
              ></img>{" "}
              Mail Box
            </Typography>

            <Box
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            ></Box>

            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "#0b0c10",
                textDecoration: "none",
                fontSize: 25,
                gap: "15px",
                cursor: "pointer",
              }}
            >
              <img
                alt="mailBoxLogo"
                src={mailBoxLogo}
                width="50px"
                height="50px"
              ></img>
              Mail Box
            </Typography>

            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ flexGrow: 0, display: "flex" }}>
              <>
                <div
                  style={{
                    color: "#0b0c10",
                    fontSize: 20,
                    fontWeight: 700,
                    marginRight: "10px",
                    marginTop: "8px",
                  }}
                >
                  {userData ? "Welcome " + userName : null}
                </div>

                {!userData && (
                  <>
                    <Button
                      sx={{
                        color: "#0b0c10",
                        fontSize: "20px",
                        fontWeight: 700,
                        textTransform: "none",
                      }}
                      onClick={navToLoginForm}
                    >
                      Login
                    </Button>
                    <IconButton sx={{ p: 0 }}>
                      <Avatar alt="Remy Sharp" />
                    </IconButton>
                  </>
                )}

                {userData && (
                  <>
                    <Tooltip title="Open">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src={userPhoto} />
                      </IconButton>
                    </Tooltip>

                    <Menu
                      sx={{ mt: "45px" }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      {settings.map((setting) => (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                          <Typography
                            textAlign="center"
                            onClick={() => avtarHandler(setting)}
                          >
                            {setting}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </>
                )}
              </>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default Header;
