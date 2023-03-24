import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { useDispatch, useSelector } from "react-redux";
import { mailBoxAction } from "../reducer/mailBoxSlice";
import Avatar from '@mui/material/Avatar';
import { teal } from '@mui/material/colors';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MessageBox() {
  const dispatch = useDispatch();
  const messageBoxOpen = useSelector((state) => state.mailBox.messageBox);
  const mailMessage = useSelector((state) => state.mailBox.mailContent);
  console.log("in message box", mailMessage);
  const messageBoxClose = () => {
    dispatch(mailBoxAction.messageBoxClose());
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={messageBoxOpen}
        onClose={messageBoxClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={messageBoxClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Message
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem>
            <ListItemText>
              <Avatar
                sx={{ bgcolor: teal[400] }}
                alt="Remy Sharp"
                src="/broken-image.jpg"
              >
                C
              </Avatar>
              {mailMessage.receiverEmail}
            </ListItemText>
            <ListItemText>{mailMessage.subject}</ListItemText>
            <ListItemText>{mailMessage.mailContent}</ListItemText>

          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}
