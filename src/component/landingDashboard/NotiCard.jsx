import PropTypes from "prop-types";
import { useEffect, useState } from "react";

// material-ui
import { styled, useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Grid,
  Menu,
  MenuItem,
  Typography,
  Badge,
  Card,
  DialogActions,
  Button,
  DialogContentText,
  DialogContent,
  DialogTitle,
  Dialog,
  useMediaQuery,
  Stack,
} from "@mui/material";
import { green, pink, indigo, blue, red } from "@mui/material/colors";

// project imports
import MainCard from "../MainCard";
// import SkeletonEarningCard from "ui-component/cards/Skeleton/EarningCard";

// assets
// import EarningIcon from "asset/images/earning.svg";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import GetAppTwoToneIcon from "@mui/icons-material/GetAppOutlined";
import FileCopyTwoToneIcon from "@mui/icons-material/FileCopyOutlined";
import PictureAsPdfTwoToneIcon from "@mui/icons-material/PictureAsPdfOutlined";
import ArchiveTwoToneIcon from "@mui/icons-material/ArchiveOutlined";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";

import * as notificationService from "../../services/notificationService";

import {
  setRole,
  setNotiCount,
  getRole,
  getNotiCount,
  getUserID,
} from "../../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: blue[800],
  color: "#fff",
  overflow: "hidden",
  position: "relative",
}));

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const NotiCard = ({ isLoading, notification }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [allNoti, setAllNoti] = useState([{}]);
  const role = useSelector(getRole);
  const noti = useSelector(getNotiCount);
  const userId = useSelector(getUserID);
  const dispatch = useDispatch();

  useEffect(() => {}, [allNoti]);

  const callNoti = async () => {
    // dispatch(setNotiCount(0));
    let data = {};
    role === "biller"
      ? (data = { billerId: userId })
      : (data = { payerId: userId });
    const notiRes = await notificationService
      .notification_inquiry(data)
      .then(function (response) {
        setAllNoti(response["notifications"]);
      });
  };

  const handleClickOpen = () => {
    callNoti();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const notiNevigate = (id) => {
    // navigate("/allbill/billinfo/"+id);
    window.location.href = "/allbill/billinfo/" + id;
  };

  return (
    <>
      <CardWrapper border={false} content={false}>
        <MenuItem onClick={handleClickOpen}>
          <Box sx={{ p: 2.5 }}>
            <Grid container direction="column">
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Avatar
                      variant="rounded"
                      sx={{
                        bgcolor: indigo[500],
                        mt: 1,
                      }}>
                      <Badge badgeContent={notification} color="primary">
                        <NotificationsNoneOutlinedIcon color="action" />
                      </Badge>
                    </Avatar>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item>
                    <Typography
                      sx={{
                        fontSize: "2.125rem",
                        fontWeight: 500,
                        mr: 1,
                        mt: 1.75,
                        mb: 0.75,
                      }}>
                      {notification === 0
                        ? "No notifications today"
                        : notification + " Notification Today"}
                    </Typography>
                  </Grid>
                  <Grid item></Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </MenuItem>

        <Dialog
          fullScreen={fullScreen}
          open={open}
          scroll={"paper"}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title">
          <DialogTitle id="responsive-dialog-title">
            {"Notification"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {allNoti.length === 0 ? (
                <MenuItem>
                  {" "}
                  <Typography>No notification </Typography>
                </MenuItem>
              ) : (
                allNoti.map((noti) => (
                  <MenuItem
                    key={noti}
                    onClick={() => notiNevigate(noti.invoiceId)}>
                    <Stack direction="row" spacing={4}>
                      <ReceiptOutlinedIcon />
                      <Typography
                        textAlign="left"
                        noWrap
                        sx={{
                          display: "inline-block",
                          whiteSpace: "pre-line",
                        }}
                        width={200}>
                        {noti.message}
                      </Typography>
                    </Stack>
                  </MenuItem>
                ))
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              cancel
            </Button>
            {/* <Button onClick={handleClose} autoFocus>
              Agree
            </Button> */}
          </DialogActions>
        </Dialog>
      </CardWrapper>
    </>
  );
};

NotiCard.propTypes = {
  isLoading: PropTypes.bool,
  notification: PropTypes.string,
};

export default NotiCard;
