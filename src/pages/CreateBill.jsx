import React from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Divider,
  Stack,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
} from "@mui/material";
import MainCard from "../component/MainCard";
import { gridSpacing } from "../store/constant";
import ResponsiveHeader from "../component/ResponsiveHeader";
import { useEffect, useState } from "react";
import DateAdapterMoment from "@mui/lab/AdapterMoment";
import DateAdapterDateFns from "@mui/lab/AdapterDateFns";
import DateAdapterDayjs from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import moment from "moment";
import { set } from "date-fns";

export default function CreateBill() {
  const [name, setName] = useState("");
  const [total, setTotal] = useState(400);
  const today = new Date().toLocaleString("th-TH").split(" ")[0];
  const [value, setValue] = React.useState(moment().add(543, "year"));
  const [allProduct, setAllProduct] = useState([]);
  const [price, setPrice] = useState();
  const [unit, setUnit] = useState();

  const headProduct = [
    { id: "index", label: "#" },
    { id: "detail", label: "ชื่อสินค้า/รายละเอียด" },
    { id: "quantity", label: "จำนวน" },
    { id: "priceUnit", label: "ราคาต่อหน่วย" },
    { id: "totalPrice", label: "ราคารวม" },
  ];

  function handleChangeUnit(e, row_index, key) {
    setUnit(e.target.value);
    console.log(row_index);
    console.log(allProduct[row_index - 1]);
    let arr = [...allProduct];
    arr[row_index - 1][key] = e.target.value;
    setAllProduct(arr);
    console.log(allProduct);

    // allProduct.map((product, index) => {
    //   if (product.index === row_index) {
    //     setAllProduct(...allProduct, {

    //     })
    //   }
    // });
  }

  const handleChange = () => {
    console.log(allProduct[0]);
  };
  const addProduct = () => {
    setAllProduct([
      ...allProduct,
      {
        index: allProduct.length + 1,
        detail: "",
        quantity: 0,
        priceUnit: 0,
        totalPrice: 0,
      },
    ]);
    setUnit(null);

    console.log(allProduct);
  };

  return (
    <>
      <LocalizationProvider dateAdapter={DateAdapterMoment} locale="th">
        <Box sx={{ p: 3 }}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Stack direction={{ xs: "column", sm: "row" }} margin={"auto"}>
                <ResponsiveHeader text="ใบวางบิล" />
                <Button variant="outlined" color="success">
                  สร้างบิล
                </Button>
              </Stack>
              <MainCard>
                <Box padding={5} margin={"auto"}>
                  <Grid spacing={3}>
                    <Grid item xs={12}>
                      <Grid container spacing={3}>
                        <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
                          <TextField
                            id="outlined-name"
                            label="ชื่อลูกค้า"
                            value={name}
                            onChange={handleChange}
                          />
                          <Grid pt={3}>
                            <TextField
                              id="outlined-textarea"
                              label="รายละเอียด"
                              placeholder="รายละเอียดลูกค้า"
                              multiline
                            />
                          </Grid>
                          <Grid pt={3}>
                            <TextField
                              id="outlined-textarea"
                              label="ที่อยู่"
                              placeholder="ที่อยู่ลูกค้า"
                              multiline
                            />
                          </Grid>
                        </Grid>
                        <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
                          <Grid>
                            <Box>
                              <Grid container>
                                <Grid item xs={4} md={3}>
                                  <Typography>ผู้ติดต่อ</Typography>
                                </Grid>
                                <Grid item xs={8} md={9}>
                                  <Typography>สิ่นชัย มั่นคง</Typography>
                                </Grid>
                                <Grid item xs={4} md={3}>
                                  <Typography>อีเมลล์</Typography>
                                </Grid>
                                <Grid item xs={8} md={9}>
                                  <Typography>test@gmail.com</Typography>
                                </Grid>
                                <Grid item xs={4} md={3}>
                                  <Typography>เบอร์โทร</Typography>
                                </Grid>
                                <Grid item xs={8} md={9}>
                                  <Typography>0958654531</Typography>
                                </Grid>
                              </Grid>
                            </Box>
                          </Grid>
                        </Grid>
                        <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
                          <Typography sx={{ color: "purple" }} variant="h5">
                            จำนวนเงินทั้งสิ้น
                          </Typography>
                          <Typography>{total} บาท</Typography>
                          <Box>
                            <Grid container spacing={2}>
                              <Grid item xs={12} md={3}>
                                <Typography>วันที่</Typography>
                              </Grid>
                              <Grid item xs={12} md={9}>
                                <TextField
                                  id="outlined-name"
                                  label="วันที่"
                                  disabled
                                  value={today}
                                />
                              </Grid>
                              <Grid item xs={12} md={3}>
                                <Typography>ครบกำหนด</Typography>
                              </Grid>
                              <Grid item xs={12} md={9}>
                                <DatePicker
                                  label="ครบกำหนด"
                                  openTo="year"
                                  views={["year", "month", "day"]}
                                  value={value}
                                  onChange={(newValue) => {
                                    setValue(newValue);
                                  }}
                                  renderInput={(params) => (
                                    <TextField {...params} />
                                  )}
                                />
                              </Grid>
                              <Grid item xs={12} md={3}>
                                <Typography>ผู้ออกใบแจ้งหนี้</Typography>
                              </Grid>
                              <Grid item xs={12} md={9}>
                                <TextField
                                  id="outlined-name"
                                  label="ผู้ออกใบแจ้งหนี้"
                                />
                              </Grid>
                            </Grid>
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Divider sx={{ p: 2 }}></Divider>
                    <Grid item xs={12} sx={{ pt: 2 }}>
                      <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} md={12} lg={12} spacing={2}>
                          <Stack
                            direction={{ xs: "column", sm: "row" }}
                            spacing={2}>
                            <Grid>
                              <TextField
                                id="outlined-name"
                                label="เลขที่อ้างอิง"
                                value={name}
                                onChange={handleChange}
                              />
                            </Grid>
                            <Grid>
                              <TextField
                                id="outlined-name"
                                label="ราคาสินค้า"
                                value={name}
                                onChange={handleChange}
                              />
                            </Grid>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <TableContainer>
                            <Table aria-labelledby="tableTitle" size="medium">
                              <TableHead>
                                <TableRow>
                                  {headProduct.map((headCell) => (
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
                                {allProduct.map((row, index) => {
                                  const labelId = `enhanced-table-checkbox-${index}`;
                                  //   const unit = 0;
                                  //   const totalprice = unit * 0;

                                  return (
                                    <TableRow
                                      component="th"
                                      hover
                                      role="checkbox"
                                      tabIndex={-1}
                                      key={row.id}>
                                      <TableCell
                                        id={labelId}
                                        component="th"
                                        scope="row"
                                        padding="normal">
                                        {row.index}
                                      </TableCell>
                                      <TableCell align="center">
                                        <Stack direction={"column"} spacing={1}>
                                          <TextField
                                            id="outlined-name"
                                            label="ชื่อลูกค้า"
                                          />
                                          <TextField
                                            id="outlined-detail"
                                            label="รายละเอียดสินค้า"
                                          />
                                        </Stack>
                                      </TableCell>
                                      <TableCell align="center">
                                        <TextField
                                          id="outlined-qty"
                                          label="จำนวน"
                                          type={"number"}
                                          inputProps={{
                                            inputMode: "numeric",
                                            pattern: "[0-9]*",
                                          }}
                                          onChange={(event) =>
                                            handleChangeUnit(
                                              event,
                                              row.index,
                                              "quantity"
                                            )
                                          }
                                        />
                                      </TableCell>
                                      <TableCell align="center">
                                        <TextField
                                          id="outlined-price"
                                          label="ราคา"
                                          type={"number"}
                                          inputProps={{
                                            inputMode: "numeric",
                                            pattern: "[0-9]*",
                                          }}></TextField>
                                      </TableCell>
                                      <TableCell align="center">
                                        price
                                      </TableCell>
                                    </TableRow>
                                  );
                                })}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Grid>
                        <Button onClick={() => addProduct()}>เพิ่ม</Button>
                        <Button onClick={() => handleChange()}>mf]vsd</Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </MainCard>
            </Grid>
          </Grid>
        </Box>
      </LocalizationProvider>
    </>
  );
}
