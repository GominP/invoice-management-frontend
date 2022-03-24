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
import { makeStyles } from "@mui/styles";
import * as billerService from "../services/billerServices";
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
  const userid_dispatch = useSelector((state) => state.users.userid);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let params = useParams();
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [checkNull, setCheckNull] = useState("กรุณาใส่รหัสผู้ออกใบแจ้งหนี้");
  // const {values} = useForm(initial)

  useEffect(() => {
    // console.log(userId);
  }, []);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("code" in fieldValues) {
      temp.code = values.code ? "" : "กรุณากรอกรหัส";
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
      await billerService.biller_detail_inquiry(dataAPi);
      await setOpenSuccess(true);
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
              <Card>
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
                        สอบถามรหัสจากผู้สร้างใบแจ้งหนี้ที่คุณได้ทำการติดต่อแล้ว
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
                      มีบางอย่างผิดพลาด
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
