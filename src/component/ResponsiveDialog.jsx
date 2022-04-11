import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
  Typography,
  TextField,
  Box,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import QRCode from "qrcode";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as paymentService from "../services/paymentService";
import * as notificationService from "../services/notificationService";

import {
  setRole,
  setId,
  setNotiCount,
  getRole,
  getUserID,
  getNotiCount,
  setInfoSlip,
  get_info_slip_verification,
} from "../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import RequestForm from "./controls/RequestForm";
import ResponsiveSnackbar from "./ResponsiveSnackbar";

function ResponsiveDialog(props) {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector(getUserID);

  const [openSuccess, setOpenSuccess] = useState(false);
  const [severity, setServerity] = useState("success");
  const [textSnackbar, setTextSnackbar] = useState("Request Successfully.");

  const {
    status,
    textButton,
    requestEdit,
    deleteRelation,
    cancelInvoice,
    color,
    qrcode,
    invoiceInfo,
    billerInfo,
    onClick,
  } = props;
  const [open, setOpen] = useState(false);
  const [qrcodeInfo, setQrcodeInfo] = useState({});

  useEffect(() => {
    createQr();
  }, [qrcode, invoiceInfo, billerInfo]);

  const theme = useTheme();

  const handleOpenSnackBar = (event, reason) => {
    setOpenSuccess(true);
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccess(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const createQr = async () => {
    // console.log(qrcode);
    QRCode.toDataURL(qrcode.data.qrRawData).then(setQrcodeInfo);
  };
  function currencyFormat(num) {
    return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    console.log({
      email: data.get("slip"),
      qrcode: qrcode,
    });
    let token = {
      transRef: data.get("slip"),
      uuid: qrcode.uuid,
      token: qrcode.token,
      invoiceId: qrcode.invoiceId,
    };

    paymentService
      .payment_slip_verification(token)
      .then(async function (response) {
        if (response["status"]["code"] === "1000") {
          let temp = {
            amount: response["data"]["amount"],
            paidLocalAmount: response["data"]["paidLocalAmount"],
            receiver: {
              name: response["data"]["receiver"]["name"],
              proxy: {
                type: response["data"]["receiver"]["proxy"]["type"],
                value: response["data"]["receiver"]["proxy"]["value"],
              },
            },
            sender: {
              name: response["data"]["sender"]["name"],
              proxy: {
                type: response["data"]["sender"]["proxy"]["type"],
                value: response["data"]["sender"]["proxy"]["value"],
              },
            },
            transDate: response["data"]["transDate"],
            transRef: response["data"]["transRef"],
            transTime: response["data"]["transTime"],
          };
          dispatch(setInfoSlip(temp));
          const noti =
            await notificationService.notification_unread_count_inquiry({
              payerId: userId,
            });
          dispatch(setNotiCount(noti["unreadCount"]));

          navigate("/paymentsuccess");

          console.log(temp);
        } else {
          console.log("cannot send false");
          setServerity("error");
          setTextSnackbar("Somthing Wrong with your transfer reference");
          setOpenSuccess(true);
        }
      })
      .catch((err) => {
        setServerity("error");
        setTextSnackbar("Somthing Wrong");
        setOpenSuccess(true);
      });
  };

  function currencyFormat(num) {
    return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const handleRequest = () => {
    let temp = {
      invoiceId: invoiceInfo.id,
      status: "correctionRequested",
      correctionRequest: "",
    };
    console.log(temp);
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        fullWidth
        color={color}>
        {textButton}
      </Button>
      {requestEdit === false ? (
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title">
          <Box component="form" onSubmit={handleSubmit}>
            <DialogTitle id="responsive-dialog-title">{textButton}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <Grid
                  container
                  sx={{ display: "flex", justifyContent: "center" }}>
                  <Grid item xs={12}>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <img src={qrcodeInfo} />
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    md={4}
                    sx={{ display: "flex", justifyContent: "center" }}>
                    <Typography>Biller :</Typography>
                  </Grid>
                  <Grid item xs={6} pb={2}>
                    <Typography>
                      {billerInfo.name} {billerInfo.lastname}
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    xs={6}
                    md={4}
                    sx={{ display: "flex", justifyContent: "center" }}>
                    <Typography>Total :</Typography>
                  </Grid>
                  <Grid item xs={6} pb={2}>
                    <Typography>
                      {currencyFormat(+invoiceInfo.totalAmountAddedTax)}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="slip"
                      label="Transfer Reference"
                      id="slip"
                      autoComplete="slip"
                    />
                  </Grid>
                </Grid>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClose}>
                cancel
              </Button>
              <Button type="submit" autoFocus>
                Paid
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      ) : (
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title">
          <DialogTitle id="responsive-dialog-title">{textButton}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {deleteRelation === true ? (
                <Grid item xs={12} md={12} spacing={4}>
                  <Box pt={2}>
                    <Typography>
                      {status === "inactive"
                        ? "Are you sure connect this biller"
                        : "Are you sure disconnect this biller"}
                    </Typography>
                  </Box>
                </Grid>
              ) : cancelInvoice === true ? (
                <Grid container>
                  <Grid item xs={12} md={12} spacing={4}>
                    <Box pt={2}>
                      <Typography>
                        Are you sure cancel this invoice ?
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              ) : (
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Invoice ID :</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>{invoiceInfo.id}</Typography>
                  </Grid>
                  <Grid item xs={12} md={12} spacing={4}>
                    {/* <Typography>Detail :</Typography> */}
                    <Box pt={2}>
                      <RequestForm
                        invoiceId={invoiceInfo.id}
                        onClose={handleClose}
                        openSuccessSnackBar={handleOpenSnackBar}></RequestForm>
                    </Box>
                  </Grid>
                </Grid>
              )}
            </DialogContentText>
          </DialogContent>
          {deleteRelation === true ? (
            <DialogActions>
              <Button autoFocus onClick={handleClose}>
                Cancel
              </Button>
              <Button
                onClick={onClick}
                color={status === "inactive" ? "success" : "error"}
                autoFocus>
                {status === "inactive" ? "Connect" : "Disconnect"}
              </Button>
            </DialogActions>
          ) : cancelInvoice === true ? (
            <DialogActions>
              <Button autoFocus onClick={handleClose}>
                Cancel
              </Button>
              <Button color="error" onClick={onClick} autoFocus>
                Confirm
              </Button>
            </DialogActions>
          ) : (
            <DialogActions>
              <Button autoFocus onClick={handleClose}>
                Cancel
              </Button>
              {/* <Button onClick={handleRequest} autoFocus>
                Request
              </Button> */}
            </DialogActions>
          )}
        </Dialog>
      )}

      <ResponsiveSnackbar
        text={textSnackbar}
        severity={severity}
        openSuccess={openSuccess}
        handleClose={handleCloseSnackBar}></ResponsiveSnackbar>
    </div>
  );
}

ResponsiveDialog.propTypes = {
  status: PropTypes.string.isRequired,

  textButton: PropTypes.string.isRequired,
  requestEdit: PropTypes.bool.isRequired,
  deleteRelation: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  qrcode: PropTypes.string,
  invoiceInfo: PropTypes.array.isRequired,
  billerInfo: PropTypes.array.isRequired,
  onClick: PropTypes.func,
  cancelInvoice: PropTypes.bool,
};

export default ResponsiveDialog;
