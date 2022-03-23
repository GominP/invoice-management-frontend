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
import * as registerService from "../services/registerService";
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

const Register = () => {
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
    if ("name" in fieldValues) {
      temp.name = values.name ? "" : "กรุณากรอกชื่อ";
    }
    if ("phone" in fieldValues) {
      temp.phone = values.phone ? "" : "กรุณากรอกเบอร์โทรศัพท์";
    }
    if ("citizenId" in fieldValues) {
      temp.citizenId = values.citizenId ? "" : "กรุณากรอกเลขประจำตัว";
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
  } = useForm(initValues, true, validate, params.id);

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log("1111111");
  //   // const data = new FormData(event.currentTarget);

  //   // if (passwordText !== confirmPasswordText) {
  //   //   setTextError("รหัสผ่านไม่ตรงกัน");
  //   //   setOpenError(true);
  //   // } else if (data.get("username") === "") {
  //   //   setTextError("ใส่ข้อมูลให้ครบถ้วน");
  //   //   setOpenError(true);
  //   // }

  //   // axios
  //   //   .post("http://localhost:8080/register", {
  //   //     username: data.get("username"),
  //   //     password: passwordText,
  //   //     name: data.get("name"),
  //   //     lastname: "null",
  //   //     phone: data.get("phone"),
  //   //     citizenId: data.get("citizenId"),
  //   //     taxId: data.get("taxId"),
  //   //     isCitizen: isCitizen,
  //   //     addressDetail: data.get("addressDetail"),
  //   //     road: data.get("road"),
  //   //     district: data.get("district"),
  //   //     subDistrict: data.get("subDistrict"),
  //   //     province: data.get("province"),
  //   //     zipCode: data.get("zipCode"),
  //   //     role: params.id,
  //   //   })
  //   //   .then(function (response) {
  //   //     localStorage.setItem("token", response.data["jwtToken"]);
  //   //     console.log(response.data["jwtToken"]);
  //   //     navigate("/login");
  //   //   });
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

  return (
    <div>
      <Typography
        variant="h4"
        component="h1"
        p={4}
        sx={{ display: "flex", justifyContent: "center" }}>
        สมัครสมาชิก
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
                          label="ชื่อผู้ใช้"
                          value={values.username}
                          onChange={handleInputChage}
                          error={errors.username}></Controls.Input>
                        <TextField
                          name="password"
                          label="รหัสผ่าน"
                          variant="outlined"
                          aria-describedby="password-helper-text"
                          type={showPassword ? "text" : "password"} // <-- This is where the magic happens
                          onChange={handleInputChage}
                          helperText="รหัสผ่านต้องมีตัวเลข อักษรตัวเล็ก ตัวใหญ่และอักขระพิเศษ"
                          InputProps={{
                            // <-- This is where the toggle button is added.
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}>
                                  {showPassword ? (
                                    <VisibilityIcon />
                                  ) : (
                                    <VisibilityOffIcon />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />

                        <TextField
                          name="confirmPassword"
                          label="ยืนยันรหัสผ่าน"
                          variant="outlined"
                          type={showConfirmPassword ? "text" : "password"} // <-- This is where the magic happens
                          onChange={handleInputChage}
                          InputProps={{
                            // <-- This is where the toggle button is added.
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowCPassword}
                                  onMouseDown={handleMouseDownCPassword}>
                                  {showConfirmPassword ? (
                                    <VisibilityIcon />
                                  ) : (
                                    <VisibilityOffIcon />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Divider />
                      <Typography variant="h5" component="h1" p={1}>
                        ข้อมูลส่วนตัว
                      </Typography>
                      <Grid>
                        <Controls.Input
                          name="name"
                          label="ชื่อ-สกุล / ชื่อบริษัท"
                          value={values.name}
                          onChange={handleInputChage}
                          error={errors.name}></Controls.Input>
                        <Controls.Input
                          name="phone"
                          label="เบอร์โทร"
                          value={values.phone}
                          onChange={handleInputChage}
                          error={errors.phone}></Controls.Input>
                      </Grid>
                      <Grid>
                        <Controls.Input
                          name="addressDetail"
                          label="บ้านเลขที่"
                          value={values.addressDetail}
                          onChange={handleInputChage}></Controls.Input>
                        <Controls.Input
                          name="road"
                          label="ถนน"
                          value={values.road}
                          onChange={handleInputChage}></Controls.Input>
                        <Controls.Input
                          name="district"
                          label="อำเภอ"
                          value={values.district}
                          onChange={handleInputChage}></Controls.Input>

                        <Controls.Input
                          name="subDistrict"
                          label="ตำบล"
                          value={values.subDistrict}
                          onChange={handleInputChage}></Controls.Input>
                      </Grid>
                      <Grid>
                        <Controls.Input
                          name="province"
                          label="จังหวัด"
                          value={values.province}
                          onChange={handleInputChage}></Controls.Input>
                        <Controls.Input
                          name="zipCode"
                          label="รหัสไปรษณีย์"
                          value={values.zipCode}
                          onChange={handleInputChage}></Controls.Input>
                      </Grid>
                      <Grid>
                        <Controls.Input
                          name="citizenId"
                          label="เลขประจำตัวประชาชน"
                          value={values.citizenId}
                          onChange={handleInputChage}
                          error={errors.citizenId}></Controls.Input>
                        <Controls.Input
                          name="taxId"
                          label="เลขประจำตัวผู้เสียภาษี"
                          value={values.taxId}
                          onChange={handleInputChage}></Controls.Input>
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
                        label="นิติบุคคล"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        onChange={check2}
                        checked={isCheck2}
                        control={<Checkbox />}
                        label="บุคคลธรรมดา"
                      />
                    </Grid>
                  </Box>
                  <Button onClick={() => check()}>check value</Button>

                  <Snackbar
                    open={openSuccess}
                    autoHideDuration={2000}
                    onClose={handleClose}>
                    <Alert
                      onClose={handleClose}
                      severity="success"
                      sx={{ width: "100%" }}>
                      สมัครสมาชิกสำเร็จ
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
                    สมัครสมาชิก
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

export default Register;
