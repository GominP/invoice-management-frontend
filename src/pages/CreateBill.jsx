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
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
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
import { useNavigate, useParams } from "react-router-dom";
import {
  setRole,
  setId,
  setNotiCount,
  getRole,
  getUserID,
  getNotiCount,
} from "../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";

import * as billerService from "../services/billerServices";
import * as payerService from "../services/payerService";
import * as invoiceService from "../services/invoiceService";
import * as notificationService from "../services/notificationService";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Icon } from "@material-ui/core";
import ResponsiveSnackbar from "../component/ResponsiveSnackbar";

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
  let params = useParams();
  let navigate = useNavigate();

  const role = useSelector(getRole);
  const userId = useSelector(getUserID);

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [total, setTotal] = useState(400);
  const today = new Date().toLocaleString().split(" ")[0];
  const [value, setValue] = useState(new Date());
  const [allProduct, setAllProduct] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [unit, setUnit] = useState();
  const [dataCustomerInfo, setDataCustomerInfo] = useState({});
  const [isTax, setIsTax] = useState("Yes");
  const [vats, setVats] = useState(0.0);
  const [totalAmountAddedTax, setTotalAmountAddedTax] = useState(0.0);
  const [totalAmount, setTotalAmount] = useState(0.0);

  //------Snackbar----------------------------------------------------------->
  const [textSnackbar, setTextSnackbar] = useState("Edit Success");
  const [severity, setServerity] = useState("success");
  const [openSuccess, setOpenSuccess] = useState(false);

  const TAX_RATE = 0.07;

  const initValues = {
    payerId: +params.id,
    billerId: userId,
    totalAmount: 0.0,
    vat: 0.0,
    dueDate: "",
    totalAmountAddedTax: 0.0,
    lists: [{}],
  };

  useEffect(() => {
    customerInfoApi();
  }, [allProduct]);

  const customerInfoApi = async () => {
    let data = { id: params.id };
    await payerService.payer_detail_inquiry(data).then(function (response) {
      setDataCustomerInfo(response);
    });
  };

  const headProduct = [
  
    { id: "description", label: "Product" },
    { id: "quantity", label: "Qty." },
    { id: "unitPrice", label: "Price/Unit" },
    { id: "amount", label: "total" },
    { id: "index", label: "#" },
  ];

  function handleChangeUnit(e, row_index, key) {
    let arr = [...allProduct];
    if (key === "description") {
      arr[row_index - 1]["description"] = e.target.value;
    }

    if (key === "quantity") {
      if (arr[row_index - 1]["unitPrice"] === 0) {
        arr[row_index - 1]["amount"] = 0;
      } else {
        arr[row_index - 1]["amount"] =
          e.target.value * arr[row_index - 1]["unitPrice"];
      }
    } else if (key === "unitPrice") {
      if (arr[row_index - 1]["quantity"] === 0) {
        arr[row_index - 1]["amount"] = e.target.value * 1;
      } else {
        arr[row_index - 1]["amount"] =
          e.target.value * arr[row_index - 1]["quantity"];
      }
    }
    arr[row_index - 1][key] = e.target.value;
    setAllProduct(arr);
    let priceAllProduct = 0;
    allProduct.map((data, index) => {
      priceAllProduct += data["amount"];
    });
    let temp = TAX_RATE * priceAllProduct;

    if (isTax === "Yes") {
      console.log("true Tax");

      setTotalPrice(temp + priceAllProduct);
    } else if (isTax === "no") {
      console.log("false Tax");

      setTotalPrice(priceAllProduct);
    }

    setVats(temp);
    setTotalAmount(priceAllProduct);
    setTotalAmountAddedTax(temp + priceAllProduct);
  }

  const handleChangeTax = (event) => {
    setIsTax(event.target.value);
    if (event.target.value === "Yes") {
      console.log("true Tax");
      let temp = TAX_RATE * totalAmount;
      setTotalPrice(temp + totalAmount);
    } else if (event.target.value === "no") {
      console.log("false Tax");

      console.log(subtotal(allProduct));
      setTotalPrice(subtotal(allProduct));
    }
  };

  function subtotal(items) {
    let total = 0;
    items.map((data) => {
      total += data["amount"];
    });
    return total;
  }
  const handleCreateBill = () => {
    let nullProduct = false;

    allProduct.map((item) => {
      if (item.description === "") {
        nullProduct = true;
      }
    });

    if (allProduct.length === 0) {
      console.log("null");
      setServerity("error");
      setTextSnackbar("Please add Product");
      setOpenSuccess(true);
    } else if (nullProduct === true) {
      setServerity("error");
      setTextSnackbar("Please fill Product");
      setOpenSuccess(true);
    } else {
      initValues.lists = allProduct;
      initValues.vat = vats;
      initValues.totalAmount = totalAmount;
      initValues.dueDate = value;
      initValues.totalAmountAddedTax = totalAmountAddedTax;
      console.log(initValues);

      invoiceService.invoice_create(initValues).then(async function (response) {
        const noti =
          await notificationService.notification_unread_count_inquiry({
            billerId: userId,
          });
        dispatch(setNotiCount(noti["unreadCount"]));
        navigate("/allbill");
      });
    }
  };

  const handleChange = () => {
    console.log(initValues);
  };
  const addProduct = () => {
    setAllProduct([
      ...allProduct,
      {
        index: allProduct.length + 1,
        description: "",
        quantity: 0,
        unitPrice: 0,
        amount: 0,
      },
    ]);
    setUnit(null);

    console.log(allProduct);
  };

  const handleDeleteProduct = (index) => {
    setAllProduct(
      allProduct.filter(function (el) {
        return el.index !== index;
      })
    );
  };

  function currencyFormat(num) {
    return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccess(false);
  };

  return (
    <>
      <LocalizationProvider dateAdapter={DateAdapterMoment} locale="fr">
        <Box sx={{ p: 3 }}>
          <Grid container className={classes.center}>
            <Grid item xs={12} md={7} pb={3}>
              <Stack
                className={classes.header_create}
                direction={{ xs: "column", sm: "row" }}>
                <ResponsiveHeader text="Invoice" />
                <Button
                  variant="outlined"
                  color="success"
                  onClick={handleCreateBill}
                  startIcon={<AddOutlinedIcon />}>
                  Create Invoice
                </Button>
              </Stack>
              <MainCard>
                <Box padding={3}>
                  <Grid spacing={3}>
                    <Grid item xs={12}>
                      <Grid container spacing={3}>
                        <Grid item md={6} xs={12}>
                          <TextField
                            id="outlined"
                            label="Customer"
                            value={
                              dataCustomerInfo.name +
                              " " +
                              dataCustomerInfo.lastname
                            }
                            onChange={handleChange}
                            disabled
                          />
                          {/* <Grid pt={3}>
                            <TextField
                              id="outlined"
                              label="Detail"
                              placeholder="Detail"
                              disabled
                              value={
                               
                              }
                            />
                          </Grid> */}
                          <Grid pt={3}>
                            <TextField
                              id="outlined-textarea"
                              label="Address"
                              placeholder="Address"
                              disabled
                              multiline
                              value={
                                dataCustomerInfo.addressDetail +
                                " " +
                                dataCustomerInfo.road +
                                " " +
                                dataCustomerInfo.subDistrict +
                                " " +
                                dataCustomerInfo.district +
                                " " +
                                dataCustomerInfo.province +
                                " " +
                                dataCustomerInfo.zipCode
                              }
                            />
                          </Grid>
                        </Grid>

                        <Grid item md={6} xs={12}>
                          <Typography sx={{ color: "purple" }} variant="h5">
                            TOTAL
                          </Typography>
                          <Typography>{currencyFormat(totalPrice)}</Typography>
                          <Box paddingTop={3}>
                            <Grid container spacing={2}>
                              {/* <Grid item xs={12} md={4}>
                                <Typography>Date</Typography>
                              </Grid> */}
                              <Grid item xs={12} md={8}>
                                <TextField
                                  id="outlined-name"
                                  label="Date"
                                  disabled
                                  value={today}
                                />
                              </Grid>
                              {/* <Grid item xs={12} md={4}>
                                <Typography>Expired date</Typography>
                              </Grid> */}
                              <Grid item xs={12} md={8}>
                                <DatePicker
                                  label="Expired Date"
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
                              {/* <Grid item xs={12} md={4}>
                                <Typography>Biller</Typography>
                              </Grid> */}
                              <Grid item xs={12} md={8}>
                                <TextField id="outlined-name" label="Biller" />
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
                              {/* <TextField
                                id="outlined-name"
                                label="Ref. number"
                                value={name}
                                onChange={handleChange}
                              /> */}
                            </Grid>
                            <Grid>
                              <FormControl>
                                <RadioGroup
                                  row
                                  aria-labelledby="demo-controlled-radio-buttons-group"
                                  name="controlled-radio-buttons-group"
                                  value={isTax}
                                  defaultValue={isTax}
                                  onChange={handleChangeTax}>
                                  <FormControlLabel
                                    value="no"
                                    control={<Radio />}
                                    label="No Tax"
                                  />
                                  <FormControlLabel
                                    value="Yes"
                                    control={<Radio />}
                                    label="Tax"
                                  />
                                </RadioGroup>
                              </FormControl>
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
                                      
                                      <TableCell align="center">
                                        <Stack direction={"column"} spacing={1}>
                                          <TextField
                                            id="outlined-name"
                                            label="Product"
                                            required
                                            onChange={(event) =>
                                              handleChangeUnit(
                                                event,
                                                row.index,
                                                "description"
                                              )
                                            }
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
                                              "unitPrice"
                                            )
                                          }></TextField>
                                      </TableCell>
                                      <TableCell align="center">
                                        {currencyFormat(row.amount)}
                                      </TableCell>
                                      <TableCell
                                        id={labelId}
                                        component="th"
                                        scope="row"
                                        padding="normal">
                                        <Button
                                          color="error"
                                          onClick={() =>
                                            handleDeleteProduct(row.index)
                                          }>
                                          Delete
                                        </Button>
                                        {/* {row.index} */}
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

        <ResponsiveSnackbar
          text={textSnackbar}
          severity={severity}
          openSuccess={openSuccess}
          handleClose={handleCloseSnackBar}></ResponsiveSnackbar>
      </LocalizationProvider>
    </>
  );
}
