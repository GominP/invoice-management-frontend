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
import { useEffect } from "react";

function ResponsiveDialog(props) {
  const axios = require("axios");
  const { textButton, requestEdit, deleteRelation } = props;
  const [open, setOpen] = React.useState(false);
  const [qrcode, setQrcode] = React.useState();

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
    QRCode.toString("I am a pony!", { type: "terminal" }, function (err, url) {
      setQrcode(url);
    });
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

    // axios
    //   .post("http://localhost:8080/register", {
    //     name: "mississii",
    //     lastname: "jaidee",
    //     phone: "0913671456",
    //     citizenId: "1100452139456",
    //     taxId: "1100452139456",
    //     isCitizen: true,
    //     addressDetail: "2210 soi2",
    //     road: "Krungthep-Nonthaburi",
    //     district: "Bangsue",
    //     subDistrict: "Wong Sawang",
    //     province: "Bangkok",
    //     zipCode: "10800",
    //     username: "nattanon456",
    //     password: "1234password",
    //     role: params.id,
    //   })
    //   .then(function (response) {
    //     // localStorage.setItem("token", response.data["jwtToken"]);
    //     // console.log(response.data["jwtToken"]);
    //     navigate("/login");
    //   });
    // setOpenSuccess(true);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} fullWidth>
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
                  <img src={qrcode}></img>
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
};

export default ResponsiveDialog;
