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
} from "@mui/material";
import ResponsiveHeader from "../component/ResponsiveHeader";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import Dropzone from "react-dropzone";
import { useDropzone } from "react-dropzone";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ResponsiveSnackbar from "../component/ResponsiveSnackbar";

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
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
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

    // axios
    //   .post(url, {
    // name: "mississii",
    // lastname: "jaidee",
    // phone: "0913671456",
    // citizenId: "1100452139456",
    // addressDetail: "2210 soi2",
    // road: "Krungthep-Nonthaburi",
    // district: "Bangsue",
    // subDistrict: "Wong Sawang",
    // province: "Bangkok",
    // zipCode: "10800"
    //   })
    //   .then(function (response) {
    //     // localStorage.setItem("token", response.data["jwtToken"]);
    //     // console.log(response.data["jwtToken"]);
    //     navigate("/login");
    //   });
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
        แก้ไขข้อมูล
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
                {params.role === "biller" ? (
                  <Box>
                    <Box m={1}>
                      <TextField
                        id="outlined-textarea"
                        label="รหัสผู้ว่างบิล"
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
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEdit()}>
                    แก้ไขข้อมูล
                  </Button>
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
                    ยกเลิก
                  </Button>
                  <Button type="submit" variant="outlined" color="success">
                    ยืนยันการแก้ไขข้อมูล
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
      </Box>
    </div>
  );
};

export default EditProfile;
