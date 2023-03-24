import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import MailIcon from "@mui/icons-material/Mail";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getMailAction,
  receiveMailAction,
  sendMailAction,
} from "../reducer/asyncMailBox";
import Inbox from "./Inbox";
import SentBox from "./SentBox";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MailBoxAppBar() {
  const userData = useSelector((state) => state.user.getUserData);
  const inBoxLength = useSelector((state) => state.mailBox.inBox);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const [openCompose, setOpenCompose] = React.useState(false);

  const [mailTo, setMailTo] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [mailContent, setMailContent] = React.useState("");

  const [showInbox, setShowInbox] = React.useState(false);
  const [showSentbox, setShowSentbox] = React.useState(false);

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpenCompose(true);
  };

  const handleClose = () => {
    setOpenCompose(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navToHome = () => {
    navigate("/");
  };

  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.toLocaleString("default", { month: "short" });
  const year = currentDate.getFullYear();
  const hour = currentDate.getHours();
  const minute = currentDate.getMinutes();
  const AmPm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  const time = `${hour12}:${minute} ${AmPm}`;
  const DateAndTime = `${day}/${month}/${year} ,  ${time}`;

  const sendMailButtonHandler = () => {
    const mailDataForSentbox = {
      id: Math.floor(Math.random() * 10000),
      DateAndTime: DateAndTime,
      senderEmail: userData.email,
      receiverEmail: mailTo,
      subject: subject,
      mailContent: mailContent,
    };
    const mailDataForInbox = {
      id: Math.floor(Math.random() * 10000),
      DateAndTime: DateAndTime,
      senderEmail: userData.email,
      receiverEmail: mailTo,
      subject: subject,
      mailContent: mailContent,
    };

    dispatch(sendMailAction(mailDataForSentbox));
    dispatch(receiveMailAction(mailDataForInbox));

    setTimeout(() => {
      dispatch(getMailAction(userData.email));
    }, 1000);

    setMailTo("");
    setSubject("");
    setMailContent("");
    handleClose();
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{ backgroundColor: "rgb(29,233,182)", color: "#0b0c10" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Mail Box
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Box>
          <>
            <Button onClick={navToHome}>Go to Home </Button>
          </>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <Divider />

        <List
          onClick={handleClickOpen}
          sx={{
            background: "linear-gradient(to right, #66fcf1,#66ff66)",
          }}
        >
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <AddCircleOutlineIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                Compose
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </List>

        <List>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => setShowInbox((prev)=> !prev)}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <InboxIcon />
              </ListItemIcon>
              <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                <span
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>Inbox</span> <span style={{fontWeight:700}}>{inBoxLength.length}</span>
                </span>
              </ListItemText> 
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <StarBorderIcon />
              </ListItemIcon>
              <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                Starrer
              </ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => setShowSentbox((prev)=> !prev)}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <SendIcon />
              </ListItemIcon>
              <ListItemText sx={{ opacity: open ? 1 : 0 }}>Sent</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>

        <Divider />

        <List>
          {["Bin", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index === 0 ? <DeleteIcon /> : <ReportGmailerrorredIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography>
          <div>
            <Dialog
              fullScreen={fullScreen}
              open={openCompose}
              onClose={handleClose}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogContent>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "55ch" },
                  }}
                >
                  <TextField
                    id="standard-basic"
                    label="To"
                    type="email"
                    variant="standard"
                    value={mailTo}
                    onChange={(event) => {
                      setMailTo(event.target.value);
                    }}
                  />
                </Box>

                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "55ch" },
                  }}
                >
                  <TextField
                    id="standard-basic"
                    label="Subject"
                    variant="standard"
                    value={subject}
                    onChange={(event) => {
                      setSubject(event.target.value);
                    }}
                  />
                </Box>

                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "55ch" },
                  }}
                >
                  <TextField
                    id="outlined-multiline-static"
                    label="Compose Mail"
                    multiline
                    rows={8}
                    value={mailContent}
                    onChange={(event) => {
                      setMailContent(event.target.value);
                    }}
                  />
                </Box>
              </DialogContent>
              <DialogActions
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  variant="contained"
                  autoFocus
                  endIcon={<SendIcon />}
                  onClick={sendMailButtonHandler}
                >
                  Send
                </Button>
                <Button autoFocus onClick={handleClose}>
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </Typography>

        <Typography>
          {/* {showInbox && <Inbox />} */}
        
        {showInbox ? <Inbox /> : null}
        {showSentbox ? <SentBox /> : null}
        
        </Typography>

        {/* <Typography>{showSentbox && <SentBox />}</Typography> */}
      </Box>
    </Box>
  );
}
