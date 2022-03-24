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
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  th: {
    backgroundColor: "#48A0AC",
  },
  form: {
    width: 600,
    [theme.breakpoints.down("sm")]: {
      width: 250,
    },
  },
  center: {
    display: "flex",
    justifyContent: "center",
  },
  header_create: {
    display: "flex",
    justifyContent: "space-between",
    padding: 5,
  },
}));

export default function CreateBill() {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [total, setTotal] = useState(400);
  const today = new Date().toLocaleString("th-TH").split(" ")[0];
  const [value, setValue] = useState(moment().add(543, "year"));
  const [allProduct, setAllProduct] = useState([]);
  const [price, setPrice] = useState(0);
  const [unit, setUnit] = useState();

  const headProduct = [
    { id: "index", label: "#" },
    { id: "detail", label: "Product" },
    { id: "quantity", label: "Qty." },
    { id: "priceUnit", label: "Price/Unit" },
    { id: "totalPrice", label: "total" },
  ];

  function handleChangeUnit(e, row_index, key) {
    // setUnit(e.target.value);
    // console.log(row_index);
    // console.log(allProduct[row_index - 1]);
    let arr = [...allProduct];

    if (key === "quantity") {
      if (arr[row_index - 1]["priceUnit"] === 0) {
        arr[row_index - 1]["totalPrice"] = 0;
      } else {
        arr[row_index - 1]["totalPrice"] =
          e.target.value * arr[row_index - 1]["priceUnit"];
      }
    } else if (key === "priceUnit") {
      if (arr[row_index - 1]["quantity"] === 0) {
        arr[row_index - 1]["totalPrice"] = e.target.value * 1;
      } else {
        arr[row_index - 1]["totalPrice"] =
          e.target.value * arr[row_index - 1]["quantity"];
      }
    }
    arr[row_index - 1][key] = e.target.value;
    setAllProduct(arr);
    let priceAllProduct = 0;
    allProduct.map((data, index) => {
      priceAllProduct += data["totalPrice"];
    });
    setPrice(priceAllProduct);
    // console.log(priceAllProduct);

    // console.log(allProduct);
  }

  const handleChange = () => {
    console.log(allProduct);
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

  function currencyFormat(num) {
    return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <>
      <LocalizationProvider dateAdapter={DateAdapterMoment} locale="th">
        <Box sx={{ p: 3 }}>
          <Grid container className={classes.center}>
            <Grid item xs={12} md={7} pb={3}>
              <Stack
                className={classes.header_create}
                direction={{ xs: "column", sm: "row" }}>
                <ResponsiveHeader text="หน้าสร้างใบแจ้งหนี้" />
                <Button variant="outlined" color="success">
                  Create Invoice
                </Button>
              </Stack>
              <MainCard>
                <Box padding={3}>
                  <Grid spacing={3}>
                    <Grid item xs={12}>
                      <Grid container spacing={3}>
                        <Grid item xl={4} lg={4} md={6} sm={6} xs={4}>
                          <TextField
                            id="outlined"
                            label="Customer"
                            value={name}
                            onChange={handleChange}
                          />
                          <Grid pt={3}>
                            <TextField
                              id="outlined"
                              label="Detail"
                              placeholder="Detail"
                              multiline
                            />
                          </Grid>
                          <Grid pt={3}>
                            <TextField
                              id="outlined-textarea"
                              label="Address"
                              placeholder="Address"
                              multiline
                            />
                          </Grid>
                        </Grid>
                        <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
                          <Grid>
                            <Box>
                              <Grid container>
                                <Grid item xs={4} md={12}>
                                  <Typography>Contact name :</Typography>
                                </Grid>
                                <Grid item xs={8} md={12}>
                                  <Typography>สิ่นชัย มั่นคง</Typography>
                                </Grid>

                                <Grid item xs={4} md={3}>
                                  <Typography>Phone number : </Typography>
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
                            TOTAL
                          </Typography>
                          <Typography>{currencyFormat(price)}</Typography>
                          <Box paddingTop={3}>
                            <Grid container spacing={2}>
                              <Grid item xs={12} md={4}>
                                <Typography>Date</Typography>
                              </Grid>
                              <Grid item xs={12} md={8}>
                                <TextField
                                  id="outlined-name"
                                  label="วันที่"
                                  disabled
                                  value={today}
                                />
                              </Grid>
                              <Grid item xs={12} md={4}>
                                <Typography>Expired date</Typography>
                              </Grid>
                              <Grid item xs={12} md={8}>
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
                              <Grid item xs={12} md={4}>
                                <Typography>Biller</Typography>
                              </Grid>
                              <Grid item xs={12} md={8}>
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
                                label="Ref. number"
                                value={name}
                                onChange={handleChange}
                              />
                            </Grid>
                            <Grid>
                              <TextField
                                id="outlined-name"
                                label="Promotion"
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
                                            label="Product"
                                          />
                                        </Stack>
                                      </TableCell>
                                      <TableCell align="center">
                                        <TextField
                                          id="outlined-qty"
                                          label="Qty."
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
                                          label="Price"
                                          type={"number"}
                                          maxLength={6}
                                          inputProps={{
                                            inputMode: "numeric",
                                            pattern: "[0-9]*",
                                            maxLength: 10,
                                            step: "1",
                                          }}
                                          onChange={(event) =>
                                            handleChangeUnit(
                                              event,
                                              row.index,
                                              "priceUnit"
                                            )
                                          }></TextField>
                                      </TableCell>
                                      <TableCell align="center">
                                        {currencyFormat(row.totalPrice)}
                                      </TableCell>
                                    </TableRow>
                                  );
                                })}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Grid>
                        <Button onClick={() => addProduct()}>
                          + Add Product
                        </Button>
                        {/* <Button onClick={() => handleChange()}>mf]vsd</Button> */}
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
