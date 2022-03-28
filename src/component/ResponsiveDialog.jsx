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

function ResponsiveDialog(props) {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    textButton,
    requestEdit,
    deleteRelation,
    color,
    qrcode,
    invoiceInfo,
    billerInfo,
  } = props;
  const [open, setOpen] = useState(false);
  const [qrcodeInfo, setQrcodeInfo] = useState({});

  useEffect(() => {
    createQr();
  }, [qrcode, invoiceInfo, billerInfo]);

  const theme = useTheme();

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

    paymentService.payment_slip_verification(token).then(function (response) {
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
        navigate("/paymentsuccess");

        console.log(temp);
      } else {
        console.log("cannot send false");
      }

      console.log(response);
    });
  };

  function currencyFormat(num) {
    return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

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
                <Grid container>
                  <Grid item xs={12} md={6}>
                    <Typography>Biller :</Typography>
                  </Grid>
                  <Grid item xs={12} md={6} pb={2}>
                    <Typography>
                      {billerInfo.name} {billerInfo.lastname}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography>Total :</Typography>
                  </Grid>
                  <Grid item xs={12} md={6} pb={2}>
                    <Typography>{invoiceInfo.totalAmountAddedTax}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    {/* <Typography>พนักงานออกใบแจ้งหนี้ :</Typography> */}
                  </Grid>
                  <Grid item xs={12} md={6} pb={2}>
                    <Typography></Typography>
                  </Grid>
                  <img src={qrcodeInfo} />

                  <Grid item xs={12} md={12}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="slip"
                      label="slip code"
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
                  <Typography>รายละเอียดหมายเหตุ :</Typography>
                  <TextField
                    fullWidth
                    id="outlined-textarea"
                    // label="รายละเอียดหมายเหตุ"
                    placeholder="รายละเอียดหมายเหตุ"
                    multiline
                  />
                </Grid>
              ) : (
                <Grid container>
                  <Grid item xs={4} md={3}>
                    <Typography>เลขที่ใบแจ้งหนี้ :</Typography>
                  </Grid>
                  <Grid item xs={8} md={9}>
                    <Typography>b61104561</Typography>
                  </Grid>
                  <Grid item xs={12} md={12} spacing={4}>
                    <Typography>รายละเอียดหมายเหตุ :</Typography>
                    <TextField
                      fullWidth
                      id="outlined-textarea"
                      // label="รายละเอียดหมายเหตุ"
                      placeholder="รายละเอียดหมายเหตุ"
                      multiline
                    />
                  </Grid>
                </Grid>
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              ยกเลิก
            </Button>
            <Button onClick={handleClose} autoFocus>
              ส่งคำร้อง
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}

ResponsiveDialog.propTypes = {
  textButton: PropTypes.string.isRequired,
  requestEdit: PropTypes.bool.isRequired,
  deleteRelation: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  qrcode: PropTypes.string,
  invoiceInfo: PropTypes.array.isRequired,
  billerInfo: PropTypes.array.isRequired,
};

export default ResponsiveDialog;
