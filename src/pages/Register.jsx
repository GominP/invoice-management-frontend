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
} from "@mui/material";
import Grid from "@mui/material/Grid";
import ResponsiveHeader from "../component/ResponsiveHeader";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useNavigate, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Password } from "@mui/icons-material";

const Register = () => {
  let navigate = useNavigate();
  let params = useParams();
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);

  const [showPassword, setShowPassword] = React.useState(false);
  const [textError, setTextError] = React.useState("");

  const [showConfirmPassword, setShowConfrimPassword] = React.useState(false);

  const [passwordText, setPasswordText] = React.useState("");
  const [confirmPasswordText, setConfirmPasswordText] = React.useState("");

  const axios = require("axios");
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    if (passwordText !== confirmPasswordText) {
      setTextError("รหัสผ่านไม่ตรงกัน");
      setOpenError(true);
    } else if (data.get("username") === "") {
      setTextError("ใส่ข้อมูลให้ครบถ้วน");
      setOpenError(true);
    }

    console.log({
      email: data.get("email"),
      password: passwordText,
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
    setOpenSuccess(true);
  };

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

  return (
    <div>
      {/* <ResponsiveHeader text="สมัครสมาชิก"></ResponsiveHeader> */}
      <Typography
        variant="h4"
        component="h1"
        p={4}
        sx={{ display: "flex", justifyContent: "center" }}>
        สมัครสมาชิก
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
                <Grid spacing={3}>
                  <Grid
                    item
                    sx={{
                      "& .MuiTextField-root": { m: 1 },
                    }}>
                    <Grid>
                      <TextField
                        id="outlined-textarea"
                        label="ชื่อผู้ใช้"
                        placeholder="ชื่อผู้ใช้"
                        name="username"
                        multiline
                      />

                      <TextField
                        label="รหัสผ่าน"
                        variant="outlined"
                        type={showPassword ? "text" : "password"} // <-- This is where the magic happens
                        onChange={handlePasswordText}
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
                        label="ยืนยันรหัสผ่าน"
                        variant="outlined"
                        type={showConfirmPassword ? "text" : "password"} // <-- This is where the magic happens
                        onChange={handleConfirmPasswordText}
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
                      <TextField
                        id="outlined-textarea"
                        label="ชื่อ-สกุล / ชื่อบริษัท"
                        placeholder="ชื่อ-นามสกุล"
                        name="name"
                        multiline
                      />
                      <TextField
                        id="outlined-textarea"
                        label="เบอร์โทร"
                        placeholder="เบอร์โทร"
                        name="phone"
                        multiline
                      />
                      <TextField
                        id="outlined-textarea"
                        label="อีเมลล์"
                        placeholder="อีเมลล์"
                        name="email"
                        multiline
                      />
                    </Grid>
                    <Grid>
                      <TextField
                        fullWidth
                        id="outlined-textarea"
                        label="ที่อยู่"
                        placeholder="ที่อยู่"
                        name="addressDetail"
                        multiline
                      />
                    </Grid>
                    <Grid>
                      <TextField
                        id="outlined-textarea"
                        label="เลขประจำตัวประชาชน"
                        placeholder="เลขประจำตัวประชาชน"
                        name="citizenId"
                        multiline
                      />
                      <TextField
                        id="outlined-textarea"
                        label="เลขประจำตัวผู้เสียภาษี"
                        placeholder="เลขประจำตัวผู้เสียภาษี"
                        name="taxId"
                        multiline
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Divider />

                <Box m={1}>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="บุคคลธรรมดา"
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="นิติบุคคล"
                    />
                  </FormGroup>
                </Box>
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
      </Box>
    </div>
  );
};

export default Register;
