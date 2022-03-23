import React from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Paper,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
  TextField,
  Divider,
  FormGroup,
  Checkbox,
  Snackbar,
  Alert,
  Stack,
  IconButton,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { addItem, addItem2, getUsers } from "../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
const url = "http://localhost:8080/";

export default function AddBiller() {
  const axios = require("axios");
  const userid = useSelector((state) => state.users.userid);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let params = useParams();
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);

  useEffect(() => {
    console.log(userid);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    // console.log({
    //   code: data.get("code"),
    //   id: id,
    // });

    axios
      .post(
        url + "relationship-create",
        { payerId: userid, code: data.get("code") },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then(function (response) {
        console.log(response);
        setOpenSuccess(true);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccess(false);
    setOpenError(false);
  };
  return (
    <div>
      <Typography
        variant="h4"
        component="h1"
        p={4}
        sx={{ display: "flex", justifyContent: "center" }}>
        เพิ่มผู้สร้างใบแจ้งหนี้ {userid}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", justifyContent: "center" }}>
        <Grid>
          <Grid item xs={12}>
            <Card>
              <CardMedia />
              <CardContent>
                <Grid>
                  <Grid
                    item
                    sx={{
                      "& .MuiTextField-root": { m: 1, maxWidth: "45ch" },
                    }}>
                    <Typography variant="h6" p={2}>
                      เพิ่มผู้สร้างใบแจ้งหนี้จากรหัส
                    </Typography>

                    <Typography variant="h7">
                      สอบถามรหัสจากผู้สร้างใบแจ้งหนี้ที่คุณได้ทำการติดต่อแล้ว
                    </Typography>

                    <Grid>
                      <TextField
                        fullWidth
                        id="outlined-textarea"
                        label="รหัส"
                        // placeholder="ที่อยู่"
                        name="code"
                        multiline
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Divider />

                {/* {openSuccess === true ? (
              <Alert severity="success">สมัครสมาชิกสำเร็จ</Alert>
            ) : null} */}

                <Snackbar
                  open={openSuccess}
                  autoHideDuration={2000}
                  onClose={handleClose}>
                  <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: "100%" }}>
                    เพิ่มสำเร็จ
                  </Alert>
                </Snackbar>
                <Snackbar
                  open={openError}
                  autoHideDuration={2000}
                  onClose={handleClose}>
                  <Alert
                    onClose={handleClose}
                    severity="error"
                    sx={{ width: "100%" }}>
                    sdsdsd
                  </Alert>
                </Snackbar>

                {/* <Grid item xs={6} sm={6} md={6} xl={6}></Grid> */}
              </CardContent>
              <CardActions>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mb: 2 }}>
                  เพิ่ม
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
