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
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import QRCode from "qrcode";
import { useEffect } from "react";

function ResponsiveDialog(props) {
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
          <DialogTitle id="responsive-dialog-title">{textButton}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Grid container>
                <Grid item xs={4} md={3}>
                  <Typography>ชื่อบริษัท/ผู้วางบิล :</Typography>
                </Grid>
                <Grid item xs={8} md={9}>
                  <Typography>นาย ทรัพย์ ทวี</Typography>
                </Grid>
                <Grid item xs={4} md={3}>
                  <Typography>ยอดรวมสุทธิ :</Typography>
                </Grid>
                <Grid item xs={8} md={9}>
                  <Typography>0958654531</Typography>
                </Grid>
                <Grid item xs={4} md={3}>
                  <Typography>พนักงานออกบิล :</Typography>
                </Grid>
                <Grid item xs={8} md={9}>
                  <Typography>test@gmail.com</Typography>
                </Grid>
                <img src={qrcode}></img>
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Disagree
            </Button>
            <Button onClick={handleClose} autoFocus>
              Agree
            </Button>
          </DialogActions>
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
