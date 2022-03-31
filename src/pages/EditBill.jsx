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
  CardContent,
  Card,
  CardHeader,
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

export default function EditBill() {
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
  const [unit, setUnit] = useState();
  const [dataCustomerInfo, setDataCustomerInfo] = useState({});
  // const [isTax, setIsTax] = useState("Yes");
  const [totalAmountAddedTax, setTotalAmountAddedTax] = useState(0);
  const [invoiceInfo, setInvoiceInfo] = useState({});
  //-------------------SnackBar-------------------------------------->
  const [textSnackbar, setTextSnackbar] = useState("Edit Success");
  const [severity, setServerity] = useState("success");
  const [openSuccess, setOpenSuccess] = useState(false);
  //------------------ShowTotal-------------------------------------->
  const [vats, setVats] = useState(0.0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0.0);

  const TAX_RATE = 0.07;

  const initValues = {
    payerId: +params.payerId,
    billerId: userId,
    totalAmount: 0.0,
    vat: 0.0,
    dueDate: "",
    totalAmountAddedTax: 0.0,
    lists: [{}],
  };

  useEffect(() => {
    // console.log(params.id);
    // console.log(params.payerId);

    customerInfoApi();
  }, []);

  const customerInfoApi = async () => {
    let dataTemp = {};
    await invoiceService
      .invoice_detail_inquiry({
        id: params.id,
      })
      .then(function (response) {
        console.log(response);
        setInvoiceInfo(response);

        setAllProduct(response["lists"]);
        setTotalAmount(response["totalAmount"]);
        setTotalPrice(response["totalAmountAddedTax"]);
        setVats(response["vat"]);
      });
    await payerService
      .payer_detail_inquiry({ id: params.payerId })
      .then(function (response) {
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

    arr.map((item) => {
      if (item.id === row_index) {
        if (key === "description") {
          item.description = e.target.value;
        }
        if (key === "quantity") {
          if (item.unitPrice === 0) {
            item.amount = 0;
          } else {
            item.amount = +e.target.value * item.unitPrice;
          }
          item.quantity = +e.target.value;
        }
        if (key === "unitPrice") {
          if (item.quantity === 0) {
            item.amount = 0;
          } else {
            item.amount = +e.target.value * item.quantity;
          }
          item.unitPrice = +e.target.value;
        }
      }
    });
    setAllProduct(arr);
    let priceAllProduct = 0;
    allProduct.map((data, index) => {
      priceAllProduct += data["amount"];
    });
    let temp = TAX_RATE * priceAllProduct;

    setTotalPrice(temp + priceAllProduct);

    setVats(temp);
    setTotalAmount(priceAllProduct);
    setTotalAmountAddedTax(temp + priceAllProduct);
  }

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccess(false);
  };

  function subtotal(items) {
    let total = 0;
    items.map((data) => {
      total += data["amount"];
    });
    return total;
  }
  const handleEditInvoice = () => {
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
      // invoiceService
      //   .invoice_status_update({
      //     id: invoiceInfo.id,
      //     status: "cancelled",
      //   })
      //   .then(function (response) {
      //     console.log(response);
      //     invoiceService
      //       .invoice_create(initValues)
      //       .then(function (response) {
      //         console.log(response);
      //       })
      //       .catch((err) => {
      //         console.log(err);
      //       });
      //   });

      let tempData = {
        payerId: +params.payerId,
        billerId: userId,
        totalAmount: totalAmount,
        vat: vats,
        dueDate: value,
        totalAmountAddedTax: totalAmountAddedTax,
        lists: allProduct,
      };

      invoiceService.invoice_create(tempData).then(function (response) {
        console.log(response);
      });
    }
  };

  const handleChange = () => {
    console.log(allProduct);
  };
  const addProduct = () => {
    setAllProduct([
      ...allProduct,
      {
        id: allProduct.length + 1,
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
        return el.id !== index;
      })
    );
  };

  function currencyFormat(num) {
    return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

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
                  type="submit"
                  onClick={handleEditInvoice}>
                  Edit Invoice
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
                          <Grid item xs={12} md={8} pt={3}>
                            <TextField
                              id="outlined-name"
                              label="Date"
                              disabled
                              value={today}
                            />
                          </Grid>

                          <Grid item xs={12} md={8} pt={3}>
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

                          <Grid item xs={12} md={8} pt={3}>
                            <TextField
                              id="outlined-name"
                              label={invoiceInfo.billerName}
                              disabled
                            />
                          </Grid>
                        </Grid>

                        <Grid item md={6} xs={12}>
                          <Typography sx={{ color: "purple" }} variant="h3">
                            TOTAL
                          </Typography>
                          <Typography variant="h4" pt={2}>
                            {currencyFormat(totalPrice)}
                          </Typography>
                          <Box paddingTop={3}>
                            <Grid container>
                              <Grid item xs={4} md={3}>
                                <Typography>Subtotal</Typography>
                              </Grid>
                              <Grid item xs={8} md={9}>
                                <Typography>
                                  {currencyFormat(totalAmount)}
                                </Typography>
                              </Grid>
                              <Grid item xs={4} md={3}>
                                Vats 7%
                              </Grid>
                              <Grid item xs={8} md={9}>
                                <Typography>{currencyFormat(vats)}</Typography>
                              </Grid>
                              <Grid item xs={4} md={3}>
                                Total
                              </Grid>
                              <Grid item xs={8} md={9}>
                                <Typography>
                                  {currencyFormat(totalPrice)}
                                </Typography>
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
                            <Grid></Grid>
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
                                            defaultValue={row.description}
                                            onChange={(event) =>
                                              handleChangeUnit(
                                                event,
                                                row.id,
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
                                          defaultValue={row.quantity}
                                          inputProps={{
                                            inputMode: "numeric",
                                            pattern: "[0-9]*",
                                          }}
                                          onChange={(event) =>
                                            handleChangeUnit(
                                              event,
                                              row.id,
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
                                          defaultValue={row.unitPrice}
                                          inputProps={{
                                            inputMode: "numeric",
                                            pattern: "[0-9]*",
                                            maxLength: 10,
                                            step: "1",
                                          }}
                                          onChange={(event) =>
                                            handleChangeUnit(
                                              event,
                                              row.id,
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
                                            handleDeleteProduct(row.id)
                                          }>
                                          Delete
                                        </Button>
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
            <Grid m={7}>
              <Card>
                <CardHeader title="Edit detail"></CardHeader>
                <CardContent>{invoiceInfo.correctionRequest}</CardContent>
              </Card>
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
