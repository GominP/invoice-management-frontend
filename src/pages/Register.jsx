import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Paper,
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
  FormHelperText,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import ResponsiveHeader from "../component/ResponsiveHeader";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useNavigate, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Password } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm, Form } from "../utils/useForm";
import { Controls } from "../component/controls/Controls";
import * as registerService from "../services/authService";
const citizenItem = [
  {
    isCitizen: false,
    title: "นิติบุคคล",
  },
  {
    isCitizen: true,
    title: "บุคคลธรรมดา",
  },
];
const initValues = {
  username: "",
  password: "",
  confirmPassword: "",
  name: "",
  lastname: "",
  phone: "",
  citizenId: "",
  taxId: "",
  isCitizen: false,
  addressDetail: "",
  road: "",
  district: "",
  subDistrict: "",
  province: "",
  zipCode: "",
  role: "",
};

const RegisterOld = () => {
  let navigate = useNavigate();
  let params = useParams();
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [textError, setTextError] = useState("");

  const [showConfirmPassword, setShowConfrimPassword] = useState(false);

  const [passwordText, setPasswordText] = useState("");
  const [confirmPasswordText, setConfirmPasswordText] = useState("");
  const [isCheck1, setIscheck1] = useState(false);
  const [isCheck2, setIscheck2] = useState(false);
  const [isCitizen, setisCitizen] = useState(false);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("username" in fieldValues) {
      temp.username = values.username ? "" : "กรุณากรอก username";
    }
    if ("password" in fieldValues) {
      temp.password = values.password ? "" : "กรุณากรอกรหัสผ่าน";
    }
    if ("confirmPassword" in fieldValues) {
      temp.confirmPassword = values.confirmPassword ? "" : "กรุณากรอกรหัสผ่าน";
    }

    if ("confirmPassword" in fieldValues !== "password" in fieldValues) {
      temp.confirmPassword = values.confirmPassword
        ? ""
        : "passworddddddddddddd";
    }

    if ("name" in fieldValues) {
      temp.name = values.name ? "" : "กรุณากรอกชื่อ";
    }
    if ("lastname" in fieldValues) {
      temp.lastname = values.lastname ? "" : "กรุณากรอกนามสกุล";
    }
    if ("phone" in fieldValues) {
      temp.phone = values.phone ? "" : "กรุณากรอกเบอร์โทรศัพท์";
    }
    if ("addressDetail" in fieldValues) {
      temp.addressDetail = values.addressDetail ? "" : "กรุณากรอกบ้านเลขที่";
    }
    if ("road" in fieldValues) {
      temp.road = values.road ? "" : "กรุณากรอกถนน";
    }
    if ("district" in fieldValues) {
      temp.district = values.district ? "" : "กรุณากรอกอำเภอ";
    }
    if ("subDistrict" in fieldValues) {
      temp.subDistrict = values.subDistrict ? "" : "กรุณากรอกตำบล";
    }
    if ("province" in fieldValues) {
      temp.province = values.province ? "" : "กรุณากรอกจังหวัด";
    }
    if ("zipCode" in fieldValues) {
      temp.zipCode = values.zipCode ? "" : "กรุณากรอกเลขไปรษณีย์";
    }

    if ("citizenId" in fieldValues) {
      temp.citizenId = values.citizenId ? "" : "กรุณากรอกเลขประจำตัว";
    }
    if ("taxId" in fieldValues) {
      temp.taxId = values.taxId ? "" : "กรุณากรอกเลขประจำตัวผู้เสียภาษี";
    }
    setErrors({
      ...temp,
    });

    if (fieldValues === values) {
      return Object.values(temp).every((x) => x === "");
    }
  };

  const {
    values,
    setValues,
    handleInputChage,
    setErrors,
    errors,
    changeCitizen,
    setCheckUsernameExist,
  } = useForm(initValues, true, validate, params.id);

  // const handleSubmit = (event) => {

  //   // const data = new FormData(event.currentTarget);

  //   // if (passwordText !== confirmPasswordText) {
  //   //   setTextError("รหัสผ่านไม่ตรงกัน");
  //   //   setOpenError(true);
  //   // } else if (data.get("username") === "") {
  //   //   setTextError("ใส่ข้อมูลให้ครบถ้วน");
  //   //   setOpenError(true);
  //   // }
  //   // setOpenSuccess(true);
  // };

  const handlePasswordText = (event) => {
    setPasswordText(event.target.value);
  };
  const handleConfirmPasswordText = (event) => {
    setConfirmPasswordText(event.target.value);
  };
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const handleClickShowCPassword = () =>
    setShowConfrimPassword(!showConfirmPassword);
  const handleMouseDownCPassword = () =>
    setShowConfrimPassword(!showConfirmPassword);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccess(false);
    setOpenError(false);
  };

  const check1 = async () => {
    setIscheck1(true);
    setIscheck2(false);
    if (isCheck1 === true) {
      setIscheck1(false);
    }
    setisCitizen(false);
    changeCitizen(false);
  };
  const check2 = async () => {
    setIscheck1(false);
    setIscheck2(true);
    if (isCheck2 === true) {
      setIscheck2(false);
    }
    setisCitizen(true);
    changeCitizen(true);
  };

  const check = () => {
    console.log(values);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validate()) {
      registerService.postRegiter(values);
      // window.location.href = "/login";
    }
  };
  const handleCheckExist = (e) => {
    console.log(e.target.value);
    const checkUsername = registerService.username_exists(e.target.value);
    if (checkUsername === true) {
      setCheckUsernameExist(true);
    } else {
      setCheckUsernameExist(false);
    }
  };

  return (
    <div>
      <Typography
        variant="h4"
        component="h1"
        p={4}
        sx={{ display: "flex", justifyContent: "center" }}>
        Sign Up
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Form onSubmit={handleSubmit}>
          <Grid>
            <Grid item xs={12}>
              <Card>
                <CardMedia />
                <CardContent>
                  <Grid spacing={3}>
                    <Grid
                      item
                      sx={{
                        "& .MuiTextField-root": { m: 1 },
                      }}>
                      <Grid>
                        <Controls.Input
                          name="username"
                          label="Username"
                          value={values.username}
                          onChange={() => (handleInputChage)}
                          error={errors.username}></Controls.Input>
                        {/* <Controls.InputPassword
                          name="confrim-password"
                          label="confrim-password"
                          value={values.password}
                          onChange={handleInputChage}
                          error={errors.password}
                          showPassword={false}></Controls.InputPassword> */}
                        <Controls.InputPassword
                          name="password"
                          label="Password"
                          value={values.password}
                          onChange={handleInputChage}
                          error={errors.password}
                          showPassword={false}></Controls.InputPassword>
                        <Controls.InputPassword
                          name="confirmPassword"
                          label="Confrim Password"
                          value={values.confirmPassword}
                          onChange={handleInputChage}
                          error={errors.confirmPassword}
                          showPassword={false}></Controls.InputPassword>
                      </Grid>
                      <Divider />
                      <Typography variant="h5" component="h1" p={1}>
                        Infomation
                      </Typography>
                      <Grid>
                        <Controls.Input
                          name="name"
                          label="Firstname"
                          value={values.name}
                          onChange={handleInputChage}
                          error={errors.name}></Controls.Input>
                        <Controls.Input
                          name="lastname"
                          label="Lastname"
                          value={values.lastname}
                          onChange={handleInputChage}
                          error={errors.lastname}></Controls.Input>
                        <Controls.Input
                          name="phone"
                          label="Phone Number"
                          value={values.phone}
                          onChange={handleInputChage}
                          error={errors.phone}></Controls.Input>
                      </Grid>
                      <Grid>
                        <Controls.Input
                          name="addressDetail"
                          label="Address Detail"
                          value={values.addressDetail}
                          onChange={handleInputChage}
                          error={errors.addressDetail}></Controls.Input>
                        <Controls.Input
                          name="road"
                          label="Road"
                          value={values.road}
                          onChange={handleInputChage}
                          error={errors.road}></Controls.Input>
                        <Controls.Input
                          name="district"
                          label="District"
                          value={values.district}
                          onChange={handleInputChage}
                          error={errors.district}></Controls.Input>

                        <Controls.Input
                          name="subDistrict"
                          label="Subdistrict"
                          value={values.subDistrict}
                          onChange={handleInputChage}
                          error={errors.subDistrict}></Controls.Input>
                      </Grid>
                      <Grid>
                        <Controls.Input
                          name="province"
                          label="Province"
                          value={values.province}
                          onChange={handleInputChage}
                          error={errors.province}></Controls.Input>
                        <Controls.Input
                          name="zipCode"
                          label="Zipcode"
                          value={values.zipCode}
                          onChange={handleInputChage}
                          error={errors.zipCode}></Controls.Input>
                      </Grid>
                      <Grid>
                        <Controls.Input
                          name="citizenId"
                          label="Citizen ID"
                          value={values.citizenId}
                          onChange={handleInputChage}
                          error={errors.citizenId}></Controls.Input>
                        <Controls.Input
                          name="taxId"
                          label="Tax ID"
                          value={values.taxId}
                          onChange={handleInputChage}
                          error={errors.taxId}></Controls.Input>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Divider />

                  <Box m={1}>
                    <Grid item xs={6}>
                      <FormControlLabel
                        onChange={check1}
                        checked={isCheck1}
                        control={<Checkbox defaultChecked />}
                        label="legal entity"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        onChange={check2}
                        checked={isCheck2}
                        control={<Checkbox />}
                        label="person"
                      />
                    </Grid>
                  </Box>
                  {/* <Button onClick={() => check()}>check value</Button> */}

                  <Snackbar
                    open={openSuccess}
                    autoHideDuration={2000}
                    onClose={handleClose}>
                    <Alert
                      onClose={handleClose}
                      severity="success"
                      sx={{ width: "100%" }}>
                      Register Success
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
                    Sign Up
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Form>
      </Box>
    </div>
  );
};

export default RegisterOld;
