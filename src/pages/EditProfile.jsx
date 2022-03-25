import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import {
  Paper,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
  TextField,
  Grid,
  Divider,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  IconButton,
} from "@mui/material";
import ResponsiveHeader from "../component/ResponsiveHeader";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import Dropzone from "react-dropzone";
import { useDropzone } from "react-dropzone";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ResponsiveSnackbar from "../component/ResponsiveSnackbar";
import ResponsiveDialog from "../component/ResponsiveDialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const useStyles = makeStyles((theme) => ({
  previewChip: {
    minWidth: 160,
    maxWidth: 210,
  },
}));

const headName = [
  // { id: "index", label: "ลำดับ" },
  { id: "name", label: "ชื่อผู้ออกใบแจ้งหนี้" },
];

const EditProfile = () => {
  const classes = useStyles();
  const theme = useTheme();
  let params = useParams();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);

  const [oldPasswordText, setOldPasswordText] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [passwordText, setPasswordText] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPasswordText, setConfirmPasswordText] = useState("");
  const [showConfirmPassword, setShowConfrimPassword] = useState(false);

  // const { getRootProps, getInputProps } = useDropzone();
  const [editFlag, setEditFlag] = useState(true);
  const [stuff, setStuff] = useState([
    {
      // index: 1,
      name: "สินชัย",
      edit: true,
    },
  ]);

  useEffect(() => {}, []);

  const handleClickShowOldPassword = () => setShowOldPassword(!showOldPassword);
  const handleMouseDownOldPassword = () => setShowOldPassword(!showOldPassword);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const handleClickShowCPassword = () =>
    setShowConfrimPassword(!showConfirmPassword);
  const handleMouseDownCPassword = () =>
    setShowConfrimPassword(!showConfirmPassword);

  const handleOldPasswordText = (event) => {
    setOldPasswordText(event.target.value);
  };

  const handlePasswordText = (event) => {
    setPasswordText(event.target.value);
  };

  const handleConfirmPasswordText = (event) => {
    setConfirmPasswordText(event.target.value);
  };

  const handleClickOpenPassword = () => {
    setOpenPassword(true);
  };

  const handleClosePassword = () => {
    setOpenPassword(false);
  };

  const addStaff = () => {
    setStuff([
      ...stuff,
      {
        name: "",
        edit: false,
      },
    ]);
  };

  const handleChange = () => {
    console.log(stuff);
  };

  function handleChangeStaff(e, index, key) {
    let arr = [...stuff];
    // console.log(arr);

    // console.log(e.target.value);
    arr[index][key] = e.target.value;
    setStuff(arr);
  }

  function confirmAddStaff(index) {
    console.log("confirmAddStaff");
    // let arr = [...stuff];
    // arr[index]["edit"] = true;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let url = "";
    let role = "";

    const data = new FormData(event.currentTarget);

    if (role === "biller") {
      url = "http://localhost:8080/biller-update";
    } else {
      url = "http://localhost:8080/payer-update";
    }

    // if (passwordText !== confirmPasswordText) {
    //   setTextError("รหัสผ่านไม่ตรงกัน");
    //   setOpenError(true);
    // } else if (data.get("username") === "") {
    //   setTextError("ใส่ข้อมูลให้ครบถ้วน");
    //   setOpenError(true);
    // }

    console.log({
      name: data.get("name"),
      // url: url
      // password: passwordText,
    });

    setOpenSuccess(true);
  };

  const handleEdit = () => {
    setEditFlag(!editFlag);
  };

  const handleCloseSnackBar = (event, reason) => {
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
        Edit Profile
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
                        label="ชื่อ-นามสกุล"
                        placeholder="ชื่อ-นามสกุล"
                        name="name"
                        multiline
                      />
                      <TextField
                        name="phone"
                        id="outlined-textarea"
                        label="เบอร์โทร"
                        placeholder="เบอร์โทร"
                        multiline
                      />
                    </Grid>
                    <Grid>
                      <TextField
                        fullWidth
                        name="addressDetail"
                        id="outlined-textarea"
                        label="ที่อยู่"
                        placeholder="ที่อยู่"
                        multiline
                      />
                    </Grid>
                    <Grid>
                      <TextField
                        name="citizenId"
                        id="outlined-textarea"
                        label="เลขประจำตัวประชาชน"
                        placeholder="เลขประจำตัวประชาชน"
                        multiline
                      />
                      <TextField
                        name="taxId"
                        id="outlined-textarea"
                        label="เลขประจำตัวผู้เสียภาษี"
                        placeholder="เลขประจำตัวผู้เสียภาษี"
                        multiline
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Divider />
                {params.role === "payer" ? (
                  <Box>
                    <Box m={1}>
                      <TextField
                        id="outlined-textarea"
                        label="รหัสผู้สร้างใบแจ้งหนี้"
                        disabled
                        multiline
                        defaultValue={"Ew24T"}
                      />
                    </Box>
                    <Grid item xs={12} md={8}>
                      <TableContainer>
                        <Table aria-labelledby="tableTitle" size="medium">
                          <TableHead>
                            <TableRow>
                              {headName.map((headCell) => (
                                <TableCell
                                  key={headCell.id}
                                  align="center"
                                  padding="normal">
                                  {headCell.label}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {stuff.map((staff, index) => {
                              const labelId = `enhanced-table-checkbox-${index}`;

                              return (
                                <TableRow
                                  component="th"
                                  role="checkbox"
                                  tabIndex={-1}
                                  key={staff.id}>
                                  {staff.edit === false ? (
                                    <TableCell align="center">
                                      <TextField
                                        id="outlined-textarea"
                                        label="ชื่อผู้ออกใบแจ้งหนี้"
                                        placeholder="ชื่อผู้ออกใบแจ้งหนี้"
                                        onChange={(event) =>
                                          handleChangeStaff(
                                            event,
                                            index,
                                            "name"
                                          )
                                        }
                                      />
                                      {/* <Button
                                    onClick={() => confirmAddStaff(index)}>
                                    ยืนยัน
                                  </Button> */}
                                    </TableCell>
                                  ) : (
                                    <TableCell align="center">
                                      {staff.name}
                                    </TableCell>
                                  )}
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                        <Button
                          onClick={() => {
                            addStaff();
                          }}>
                          เพิ่มพนักงานออกใบแจ้งหนี้
                        </Button>
                        <Button onClick={() => handleChange()}>
                          check arry
                        </Button>
                      </TableContainer>
                    </Grid>
                  </Box>
                ) : null}
              </CardContent>

              {editFlag ? (
                <CardActions
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}>
                  <Stack direction={"row"} spacing={2}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleClickOpenPassword()}>
                      Change Password
                    </Button>

                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEdit()}>
                      Edit
                    </Button>
                  </Stack>
                </CardActions>
              ) : (
                <CardActions
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}>
                  <Button
                    onClick={() => handleEdit()}
                    variant="outlined"
                    color="error">
                    Cancel
                  </Button>
                  <Button type="submit" variant="outlined" color="success">
                    Confirm
                  </Button>
                </CardActions>
              )}
            </Card>
          </Grid>
          <ResponsiveSnackbar
            text="แก้ไขข้อมูลสำเร็จ"
            severity="success"
            openSuccess={openSuccess}
            openError={openError}
            handleClose={handleCloseSnackBar}></ResponsiveSnackbar>
        </Grid>

        <Dialog
          fullScreen={fullScreen}
          open={openPassword}
          onClose={handleClosePassword}
          aria-labelledby="responsive-dialog-title">
          <DialogTitle id="responsive-dialog-title">
            {"เปลี่ยนรหัสผ่าน"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Grid pt={2} spacing={3}>
                <Stack direction={"row"} spacing={2} pb={2}>
                  <TextField
                    label="รหัสผ่านเก่า"
                    variant="outlined"
                    type={showOldPassword ? "text" : "password"} // <-- This is where the magic happens
                    onChange={handleOldPasswordText}
                    InputProps={{
                      // <-- This is where the toggle button is added.
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowOldPassword}
                            onMouseDown={handleMouseDownOldPassword}>
                            {showOldPassword ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>

                <Stack direction={"row"} spacing={2}>
                  <TextField
                    label="รหัสผ่านใหม่"
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
                </Stack>
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClosePassword}>
              Disagree
            </Button>
            <Button onClick={handleClosePassword} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};

export default EditProfile;
