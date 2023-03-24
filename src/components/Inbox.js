import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteInboxMailAction,
  getMailAction,
  updateInboxStatusAction,
} from "../reducer/asyncMailBox";
import MessageBox from "./MessageBox";
import { mailBoxAction } from "../reducer/mailBoxSlice";
import { Badge, Button } from "@mui/material";

function EnhancedTableHead(props) {
  const { onSelectAllClick, numSelected, rowCount } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Inbox
        </Typography>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function SentBox() {
  const dispatch = useDispatch();
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const inboxData = useSelector((state) => state.mailBox.inBox);
  const myEmail = useSelector((state) => state.user.getUserData);
  const messageBoxOpen = useSelector((state) => state.mailBox.messageBox);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = inboxData.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - inboxData.length) : 0;

  const inboxDeleteHandler = (key) => {
    dispatch(deleteInboxMailAction({ key: key, senderEmail: myEmail.email }));
    const interval = setInterval(() => {
      dispatch(getMailAction(myEmail.email));
    }, 2000);

    return () => clearInterval(interval);
  };

  const messageInBoxHandler = (inboxMailContent) => {
    dispatch(mailBoxAction.messageBoxOpen(inboxMailContent));
  };

  const readUnreadStatus = (key) => {
    dispatch(updateInboxStatusAction({ key: key, senderEmail: myEmail.email }));
    setTimeout(() => {
      dispatch(getMailAction(myEmail.email));
    }, 1000);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={inboxData.length}
            />
            <TableBody>
              {inboxData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((items, index) => {
                  const isItemSelected = isSelected(items.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={items.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Badge
                          color="success"
                          variant="dot"
                          invisible={items.isInboxMessageRead}
                        ></Badge>
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          onClick={(event) => handleClick(event, items.id)}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="items"
                        padding="none"
                      >
                        {items.senderEmail}
                      </TableCell>
                      <TableCell align="left">{items.subject}</TableCell>
                      <TableCell align="left">
                        {
                          <span onClick={() => readUnreadStatus(items.key)}>
                            <Button onClick={() => messageInBoxHandler(items)}>
                              see messge
                            </Button>
                          </span>
                        }
                      </TableCell>
                      <TableCell align="right">{items.DateAndTime}</TableCell>
                      <TableCell align="right">
                        {" "}
                        {isItemSelected ? (
                          <Tooltip title="Delete">
                            <IconButton
                              onClick={() => inboxDeleteHandler(items.key)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        ) : null}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={inboxData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {messageBoxOpen && <MessageBox />}
    </Box>
  );
}
