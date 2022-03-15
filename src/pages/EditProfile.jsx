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
  const { getRootProps, getInputProps } = useDropzone();
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

  return (
    <div>
      <ResponsiveHeader text="รายละเอียดของผู้จ่ายบิล"></ResponsiveHeader>
      <Box sx={{ px: 5 }}>
        <Grid
          container
          spacing={{ xs: 2 }}
          columns={{ xs: 2, sm: 8, md: 12, xl: 20 }}>
          <Grid item xs={2} sm={5} md={8} xl={12}>
            <Card>
              <CardMedia />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Testss
                </Typography>
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
                        multiline
                      />
                      <TextField
                        id="outlined-textarea"
                        label="เบอร์โทร"
                        placeholder="เบอร์โทร"
                        multiline
                      />
                      <TextField
                        id="outlined-textarea"
                        label="อีเมลล์"
                        placeholder="อีเมลล์"
                        multiline
                      />
                    </Grid>
                    <Grid>
                      <TextField
                        fullWidth
                        id="outlined-textarea"
                        label="ที่อยู่"
                        placeholder="ที่อยู่"
                        multiline
                      />
                    </Grid>
                    <Grid>
                      <TextField
                        id="outlined-textarea"
                        label="เลขประจำตัวประชาชน"
                        placeholder="เลขประจำตัวประชาชน"
                        multiline
                      />
                      <TextField
                        id="outlined-textarea"
                        label="เลขประจำตัวผู้เสียภาษี"
                        placeholder="เลขประจำตัวผู้เสียภาษี"
                        multiline
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Divider />
                <Box m={1}>
                  <TextField
                    id="outlined-textarea"
                    label="รหัสผู้ว่างบิล"
                    disabled
                    multiline
                    defaultValue={"Ew24T"}
                  />
                </Box>
                <Grid item xs={6} sm={6} md={6} xl={6}>
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
                                      handleChangeStaff(event, index, "name")
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
                    <Button onClick={() => handleChange()}>check arry</Button>
                  </TableContainer>
                </Grid>
              </CardContent>
              {/* <CardActions>
                <Button size="small" color="primary">
                  Share
                </Button>
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </CardActions> */}
            </Card>
          </Grid>
          <Grid item xs={2} sm={3} md={4} xl={8}>
            <Card>
              <CardMedia />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Testss
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Des
                </Typography>
              </CardContent>
              <CardActions sx={{display: "flex",justifyContent: "flex-end"}} >
                <Button size="small" color="primary">
                  อัพโหลดรูปภาพ
                </Button>
              </CardActions>
            </Card>
            <Grid container sx={{display: "flex",justifyContent: "center"}}>
              <Button >แก้ไข</Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default EditProfile;
