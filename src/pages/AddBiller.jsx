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
import { addItem, addItem2, getRole, getUserID } from "../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import * as relationService from "../services/relationService";
import * as billerServices from "../services/billerServices";

import Controls from "../component/controls/Controls";
import { useForm, Form } from "../utils/useForm";
// import {userId} from "../store/constant";

const url = "http://localhost:8080/";

const useStyles = makeStyles((theme) => ({}));

const initValues = {
  code: "",
};

export default function AddBiller() {
  const axios = require("axios");
  const userid_dispatch = useSelector(getUserID);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let params = useParams();
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [checkNull, setCheckNull] = useState("กรุณาใส่รหัสผู้ออกใบแจ้งหนี้");
  const [textError, setTextError] = useState("Somthing Wrong !");
  // const {values} = useForm(initial)

  useEffect(() => {
    // console.log(userId);
  }, []);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("code" in fieldValues) {
      temp.code = values.code ? "" : "Please fill out this field";
    }
    setErrors({
      ...temp,
    });

    if (fieldValues === values) {
      return Object.values(temp).every((x) => x === "");
    }
  };

  const { values, setValues, handleInputChage, setErrors, errors } = useForm(
    initValues,
    true,
    validate
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    let dataAPi = { payerId: userid_dispatch, code: values.code };

    if (validate()) {
      console.log(values);
      const checkCode = await billerServices
        .biller_detail_inquiry({ code: values.code })
        .then(async function (response) {
          const addBiller = await relationService
            .relationship_create(dataAPi)
            .then(function (test) {
              setOpenSuccess(true);
            })
            .catch((err) => {
              setTextError("Something Wrong.");
              setOpenError(true);
            });
        })
        .catch((err) => {
          console.log(err.response.status);
          setTextError("This code doesn't exist in the system.");
          setOpenError(true);
        });
      console.log(checkCode);

      // if (checkCode.sta) {

      // }
    } else {
      setOpenError(true);
    }
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
        Add New Biller
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Form onSubmit={handleSubmit}>
          <Grid>
            <Grid item xs={12}>
              <Card sx={{ boxShadow: 3 }}>
                <CardMedia />
                <CardContent>
                  <Grid>
                    <Grid
                      item
                      sx={{
                        "& .MuiTextField-root": { m: 0, width: "100%" },
                      }}>
                      <Typography variant="h6" p={0}>
                        Add biller from code
                      </Typography>

                      <Typography variant="h7">
                        {/* สอบถามรหัสจากผู้สร้างใบแจ้งหนี้ที่คุณได้ทำการติดต่อแล้ว */}
                      </Typography>

                      <Grid pt={2}>
                        <Controls.Input
                          name="code"
                          label="Biller code"
                          value={values.code}
                          onChange={handleInputChage}
                          error={errors.code}></Controls.Input>
                      </Grid>
                    </Grid>
                  </Grid>

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
                      {textError}
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
                    + New Biller
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Form>
      </Box>
    </div>
  );
}
