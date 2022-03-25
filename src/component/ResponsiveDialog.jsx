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

function ResponsiveDialog(props) {
  let navigate = useNavigate();

  const axios = require("axios");
  const { textButton, requestEdit, deleteRelation, color } = props;
  const [open, setOpen] = useState(false);
  const [qrcode, setQrcode] = useState("");

  useEffect(() => {
    createQr();
  }, []);

  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const createQr = () => {
    QRCode.toDataURL(
      "00020101021230360115911256458502398020412340305123455204701153037645402205802TH5911TestPayment6007BANGKOK62340523202203231223372360000000703BMQ6304D1C8"
    ).then(setQrcode);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    // if (passwordText !== confirmPasswordText) {
    //   setTextError("รหัสผ่านไม่ตรงกัน");
    //   setOpenError(true);
    // } else if (data.get("username") === "") {
    //   setTextError("ใส่ข้อมูลให้ครบถ้วน");
    //   setOpenError(true);
    // }

    console.log({
      email: data.get("slip"),
    });

  
    navigate("/paymentsuccess");
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
                <Grid container>
                  <Grid item xs={12} md={6}>
                    <Typography>ชื่อบริษัท/ผู้วางใบแจ้งหนี้ :</Typography>
                  </Grid>
                  <Grid item xs={12} md={6} pb={2}>
                    <Typography>นาย ณัฐพร วิไลเลิศประดิษฐ์</Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography>ยอดรวมสุทธิ :</Typography>
                  </Grid>
                  <Grid item xs={12} md={6} pb={2}>
                    <Typography>0958654531</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography>พนักงานออกใบแจ้งหนี้ :</Typography>
                  </Grid>
                  <Grid item xs={12} md={6} pb={2}>
                    <Typography>test@gmail.com</Typography>
                  </Grid>
                  <img src={qrcode} />
                  <Grid item xs={12} md={12}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="slip"
                      label="กรอกเลขสลิป"
                      id="slip"
                      autoComplete="slip"
                    />
                  </Grid>
                </Grid>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClose}>
                ยกเลิก
              </Button>
              <Button type="submit" autoFocus>
                ยืนยันการจ่ายเงิน
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
};

export default ResponsiveDialog;
